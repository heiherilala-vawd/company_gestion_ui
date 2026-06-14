// dataProvider.ts
import { DeleteParams, GetListParams, GetManyParams, GetOneParams, UpdateParams } from 'react-admin'
import { getMiddleUrl, getMiddleUrlWithId, getMiddleUrlWithQuery } from '../config/dynamicResources'

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?)?$/

const toInstant = (value: any): any => {
  if (typeof value === 'string' && DATE_PATTERN.test(value)) {
    const d = new Date(value)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  return value
}

const convertDates = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (obj instanceof Date) return obj.toISOString()
  if (Array.isArray(obj)) return obj.map(convertDates)
  if (typeof obj === 'object') {
    const result: any = {}
    for (const key of Object.keys(obj)) {
      result[key] = convertDates(toInstant(obj[key]))
    }
    return result
  }
  return toInstant(obj)
}

const FLATTEN_TO_ID = new Set(['source_location', 'used_by'])

const normalizeRecord = (record: any): any => {
  if (!record || typeof record !== 'object') return record
  if (Array.isArray(record)) return record.map(normalizeRecord)

  const result: any = { ...record }
  for (const [key, value] of Object.entries(result)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && 'id' in value) {
      result[`${key}_id`] = value.id
      if (FLATTEN_TO_ID.has(key)) {
        result[key] = value.id
      }
      result[key] = normalizeRecord(value)
    } else if (Array.isArray(value)) {
      result[key] = value.map(normalizeRecord)
      if (value.length > 0 && typeof value[0] === 'object' && 'id' in value[0]) {
        const singular = key.endsWith('s') ? key.slice(0, -1) : key
        result[`${singular}_ids`] = value.map((item: any) => item.id)
      }
    }
  }
  return result
}

// Fonction pour obtenir le token
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// Fonction fetch avec token
const fetchWithToken = async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`)
    ;(error as any).status = response.status
    throw error
  }

  // Pour les DELETE, il n'y a pas toujours de body
  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

export const dataProvider = {
  // GET LIST
  getList: async (resource: string, params: GetListParams) => {
    const page = params.pagination?.page ?? 1
    const perPage = params.pagination?.perPage ?? 10
    const searchQuery = params.filter?.q
    const filters = { ...params.filter }
    delete filters.q

    const query = new URLSearchParams({
      page: page.toString(),
      page_size: perPage.toString(),
      ...filters,
    }).toString()

    const url = getMiddleUrlWithQuery(resource, query)

    const response = await fetchWithToken<{ data: T[]; total?: number }>(url)

    let rawData: any[] = Array.isArray(response) ? response : response.data || []

    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      const collectTexts = (val: any, depth = 0): string[] => {
        if (typeof val === 'string') return [val.toLowerCase()]
        if (typeof val === 'number') return [val.toString()]
        if (!val || typeof val !== 'object' || depth > 1) return []
        return Object.values(val).flatMap((v: any) => collectTexts(v, depth + 1))
      }
      rawData = rawData.filter((item: any) =>
        collectTexts(item).some((t: string) => t.includes(lower)),
      )
    }

    const data = rawData.map((item: any) => {
      const normalized = normalizeRecord(item)
      if (
        normalized.id &&
        typeof normalized.id === 'object' &&
        normalized.id.equipment_id &&
        normalized.id.warehouse_id
      ) {
        return { ...normalized, id: `${normalized.id.equipment_id}/${normalized.id.warehouse_id}` }
      }
      if (normalized.id) return normalized
      if (normalized.material?.id && normalized.warehouse?.id) {
        return { ...normalized, id: `${normalized.material.id}-${normalized.warehouse.id}` }
      }
      return { ...normalized, id: crypto.randomUUID() }
    })

    const start = (page - 1) * perPage

    return {
      data:
        !Array.isArray(response) && response.total != null
          ? data
          : data.slice(start, start + perPage),
      total: !Array.isArray(response) && response.total != null ? response.total : data.length,
    }
  },

  // GET ONE
  getOne: async (resource: string, params: GetOneParams) => {
    const url = getMiddleUrlWithId(resource, params.id)
    const data = await fetchWithToken<T>(url)
    const normalized = normalizeRecord(data)
    if (
      normalized.id &&
      typeof normalized.id === 'object' &&
      normalized.id.equipment_id &&
      normalized.id.warehouse_id
    ) {
      normalized.id = `${normalized.id.equipment_id}/${normalized.id.warehouse_id}`
    }
    return { data: normalized }
  },

  // GET MANY
  getMany: async (resource: string, params: GetManyParams) => {
    const promises = params.ids.map((id: string) => dataProvider.getOne(resource, { id }))
    const results = await Promise.all(promises)
    return { data: results.map((item) => item.data) }
  },

  // CREATE
  create: async (resource: string, params) => {
    const url = getMiddleUrl(resource)
    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify([convertDates(params.data)]),
    })

    return { data: normalizeRecord(json[0]) }
  },

  // UPDATE
  update: async (resource: string, params: UpdateParams<any>) => {
    const url = getMiddleUrl(resource)
    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify([convertDates({ ...params.data, id: params.id })]),
    })

    return { data: normalizeRecord(json[0]) }
  },

  // DELETE ONE
  deleteOne: async (resource: string, params: DeleteParams) => {
    const url = getMiddleUrlWithId(resource, params.id)
    await fetchWithToken(url, { method: 'DELETE' })

    return { data: { id: params.id } }
  },

  // UPDATE MANY (optionnel)
  updateMany: async (
    resource: string,
    params: { ids: Array<string>; data: any },
  ): Promise<{ data: Array<string> }> => {
    const url = getMiddleUrl(resource)
    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify(...params.data),
    })
    return { data: json.map((item: any) => item.id) }
  },

  // DELETE MANY (optionnel)
  deleteMany: async (
    resource: string,
    params: { ids: Array<string> },
  ): Promise<{ data: Array<string> }> => {
    const promises = params.ids.map((id: string) => dataProvider.deleteOne(resource, { id }))
    await Promise.all(promises)
    return { data: params.ids }
  },
}

export type DataProvider = typeof dataProvider
