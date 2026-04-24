// dataProvider.ts
import { stringify } from 'query-string'
import {
  CreateParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
} from 'react-admin'
import { isDynamicResource } from '../config/dynamicResources'

// Configuration
const API_URL = import.meta.env.VITE_API_URL ?? ''

// Fonction pour obtenir le token
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// Fonction pour obtenir l'ID de la company
const getCurrentCompanyId = (): string | null => {
  return localStorage.getItem('currentCompanyId')
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
    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const query = {
      _sort: field,
      _order: order.toLowerCase(),
      _start: ((page - 1) * perPage).toString(),
      _end: (page * perPage).toString(),
      ...params.filter,
    }

    const queryString = buildQueryString(query)
    let url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée. Veuillez sélectionner une company.')
      }
      url = `${API_URL}/companies/${companyId}/${resource}${queryString ? `?${queryString}` : ''}`
    }

    const response = await fetchWithToken<{ data: T[]; total?: number }>(url)

    return {
      data: Array.isArray(response) ? response : response.data || [],
      total: (response as any).total || (Array.isArray(response) ? response.length : 0),
    }
  },

  // GET ONE
  getOne: async (resource: string, params: GetOneParams) => {
    let url = `${API_URL}/${resource}/${params.id}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée. Veuillez sélectionner une company.')
      }
      url = `${API_URL}/companies/${companyId}/${resource}/${params.id}`
    }
    const data = await fetchWithToken<T>(url)

    return { data }
  },

  // GET MANY
  getMany: async (resource: string, params: GetManyParams) => {
    const query = { id: params.ids }
    const queryString = buildQueryString(query)
    let url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }
      url = `${API_URL}/companies/${companyId}/${resource}${queryString ? `?${queryString}` : ''}`
    }
    const response = await fetchWithToken<{ data: T[] }>(url)

    return {
      data: Array.isArray(response) ? response : response.data || [],
    }
  },

  // CREATE
  create: async (resource: string, params) => {
    let url = `${API_URL}/${resource}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée. Veuillez sélectionner une company.')
      }
      url = `${API_URL}/companies/${companyId}/${resource}`
    }

    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify([{ ...params.data }]),
    })

    return { data: json[0] }
  },

  // UPDATE
  update: async (resource: string, params: UpdateParams<any>) => {
    let url = `${API_URL}/${resource}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }
      url = `${API_URL}/companies/${companyId}/${resource}`
    }

    const json = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify([{ ...params.data, id: params.id }]),
    })

    return { data: json[0] }
  },

  // DELETE ONE
  deleteOne: async (resource: string, params: DeleteParams) => {
    let url = `${API_URL}/${resource}/${params.id}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()
      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }
      url = `${API_URL}/companies/${companyId}/${resource}/${params.id}`
    }
    await fetchWithToken(url, { method: 'DELETE' })

    return { data: { id: params.id } }
  },

  // UPDATE MANY (optionnel)
  updateMany: async (
    resource: string,
    params: { ids: Array<number | string>; data: any },
  ): Promise<{ data: Array<number | string> }> => {
    let url = `${API_URL}/${resource}`
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }
      url = `${API_URL}/companies/${companyId}/${resource}`
    }

    const promises = params.ids.map((id) =>
      fetchWithToken(url, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }),
    )

    await Promise.all(promises)
    return { data: params.ids }
  },

  // DELETE MANY (optionnel)
  deleteMany: async (
    resource: string,
    params: { ids: Array<number | string> },
  ): Promise<{ data: Array<number | string> }> => {
    if (isDynamicResource(resource)) {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const promises = params.ids.map((id) =>
        fetchWithToken(`${API_URL}/companies/${companyId}//${resource}/${id}`, {
          method: 'DELETE',
        }),
      )
      lo
      await Promise.all(promises)
      return { data: params.ids }
    }

    const promises = params.ids.map((id) =>
      fetchWithToken(`${API_URL}/${resource}/${id}`, {
        method: 'DELETE',
      }),
    )

    await Promise.all(promises)
    return { data: params.ids }
  },
}

export type DataProvider = typeof dataProvider
