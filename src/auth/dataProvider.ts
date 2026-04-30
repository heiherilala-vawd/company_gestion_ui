// dataProvider.ts
import { stringify } from 'query-string'
import { DeleteParams, GetListParams, GetManyParams, GetOneParams, UpdateParams } from 'react-admin'
import { getMiddleUrl, getMiddleUrlWithId, getMiddleUrlWithQuery } from '../config/dynamicResources'

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
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      throw new Error('Session expirée')
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // Pour les DELETE, il n'y a pas toujours de body
  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

// Helper pour construire les query params
const buildQueryString = (params: Record<string, any>): string => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== ''),
  )
  return stringify(filteredParams)
}

export const dataProvider = {
  // GET LIST
  getList: async (resource: string, params: GetListParams) => {
    const page = params.pagination?.page ?? 1
    const perPage = params.pagination?.perPage ?? 10
    const filters = { ...params.filter }
    const query = new URLSearchParams({
      page: page.toString(),
      page_size: perPage.toString(),
      ...filters,
    }).toString()

    const url = getMiddleUrlWithQuery(resource, query)

    const response = await fetchWithToken<{ data: T[]; total?: number }>(url)

    return {
      data: Array.isArray(response) ? response : response.data || [],
      total: (response as any).total || (Array.isArray(response) ? response.length : 0),
    }
  },

  // GET ONE
  getOne: async (resource: string, params: GetOneParams) => {
    const url = getMiddleUrlWithId(resource, params.id)
    const data = await fetchWithToken<T>(url)
    return { data }
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
      body: JSON.stringify([{ ...params.data }]),
    })

    return { data: json[0] }
  },

  // UPDATE
  update: async (resource: string, params: UpdateParams<any>) => {
    const url = getMiddleUrl(resource)
    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify([{ ...params.data, id: params.id }]),
    })

    return { data: json[0] }
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
