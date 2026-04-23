// dataProvider.ts
import { stringify } from 'query-string'
import { GetListParams } from 'react-admin'

// Configuration
const API_URL = import.meta.env.VITE_API_URL ?? ''

// Fonction pour obtenir le token
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// Fonction pour obtenir l'ID de la company
const getCurrentCompanyId = (): number | null => {
  const saved = localStorage.getItem('currentCompanyId')
  return saved ? parseInt(saved, 10) : null
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
  getList: async <T = any>(
    resource: string,
    params: GetListParams,
  ): Promise<GetListResponse<T>> => {
    console.log(`📋 getList: ${resource}`, params)

    // Cas spécial pour les jobs (dépendent de companyId)
    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée. Veuillez sélectionner une company.')
      }

      const { page, perPage } = params.pagination
      const { field, order } = params.sort

      const query = {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order.toLowerCase(),
        ...params.filter,
      }

      const queryString = buildQueryString(query)
      const url = `${API_URL}/companies/${companyId}/jobs${queryString ? `?${queryString}` : ''}`

      console.log(`🔗 URL: ${url}`)
      const response = await fetchWithToken<{ data: T[]; total?: number }>(url)

      return {
        data: Array.isArray(response) ? response : response.data || [],
        total: (response as any).total || (Array.isArray(response) ? response.length : 0),
      }
    }

    // Cas général pour les autres ressources
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
    const url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`

    console.log(`🔗 URL: ${url}`)
    const response = await fetchWithToken<{ data: T[]; total?: number }>(url)

    return {
      data: Array.isArray(response) ? response : response.data || [],
      total: (response as any).total || (Array.isArray(response) ? response.length : 0),
    }
  },

  // GET ONE
  getOne: async <T = any>(resource: string, params: GetOneParams): Promise<GetOneResponse<T>> => {
    console.log(`🔍 getOne: ${resource}/${params.id}`)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const url = `${API_URL}/companies/${companyId}/jobs/${params.id}`
      const data = await fetchWithToken<T>(url)

      return { data }
    }

    const url = `${API_URL}/${resource}/${params.id}`
    const data = await fetchWithToken<T>(url)

    return { data }
  },

  // GET MANY
  getMany: async <T = any>(
    resource: string,
    params: GetManyParams,
  ): Promise<GetManyResponse<T>> => {
    console.log(`📚 getMany: ${resource}`, params.ids)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      // Fetch multiple jobs in parallel
      const promises = params.ids.map((id) =>
        fetchWithToken<T>(`${API_URL}/companies/${companyId}/jobs/${id}`),
      )

      const data = await Promise.all(promises)
      return { data }
    }

    const query = { id: params.ids }
    const queryString = buildQueryString(query)
    const url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`

    const response = await fetchWithToken<{ data: T[] }>(url)

    return {
      data: Array.isArray(response) ? response : response.data || [],
    }
  },

  // CREATE
  create: async <T = any>(
    resource: string,
    params: CreateParams<T>,
  ): Promise<CreateResponse<T>> => {
    console.log(`➕ create: ${resource}`, params.data)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const url = `${API_URL}/companies/${companyId}/jobs`
      const data = await fetchWithToken<T>(url, {
        method: 'POST',
        body: JSON.stringify(params.data),
      })

      return { data }
    }

    const url = `${API_URL}/${resource}`
    const data = await fetchWithToken<T>(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    })

    return { data }
  },

  // UPDATE
  update: async <T = any>(
    resource: string,
    params: UpdateParams<T>,
  ): Promise<UpdateResponse<T>> => {
    console.log(`✏️ update: ${resource}/${params.id}`, params.data)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const url = `${API_URL}/companies/${companyId}/jobs/${params.id}`
      const data = await fetchWithToken<T>(url, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      })

      return { data }
    }

    const url = `${API_URL}/${resource}/${params.id}`
    const data = await fetchWithToken<T>(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    })

    return { data }
  },

  // DELETE ONE
  deleteOne: async (resource: string, params: DeleteParams): Promise<DeleteResponse> => {
    console.log(`🗑️ deleteOne: ${resource}/${params.id}`)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const url = `${API_URL}/companies/${companyId}/jobs/${params.id}`
      await fetchWithToken(url, { method: 'DELETE' })

      return { data: { id: params.id } }
    }

    const url = `${API_URL}/${resource}/${params.id}`
    await fetchWithToken(url, { method: 'DELETE' })

    return { data: { id: params.id } }
  },

  // UPDATE MANY (optionnel)
  updateMany: async (
    resource: string,
    params: { ids: Array<number | string>; data: any },
  ): Promise<{ data: Array<number | string> }> => {
    console.log(`📝 updateMany: ${resource}`, params.ids)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const promises = params.ids.map((id) =>
        fetchWithToken(`${API_URL}/companies/${companyId}/jobs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }),
      )

      await Promise.all(promises)
      return { data: params.ids }
    }

    const promises = params.ids.map((id) =>
      fetchWithToken(`${API_URL}/${resource}/${id}`, {
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
    console.log(`🗑️ deleteMany: ${resource}`, params.ids)

    if (resource === 'jobs') {
      const companyId = getCurrentCompanyId()

      if (!companyId) {
        throw new Error('Aucune company sélectionnée')
      }

      const promises = params.ids.map((id) =>
        fetchWithToken(`${API_URL}/companies/${companyId}/jobs/${id}`, {
          method: 'DELETE',
        }),
      )

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

// Export du type pour utilisation dans d'autres fichiers
export type DataProvider = typeof dataProvider
