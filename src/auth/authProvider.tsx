import { AuthProvider } from 'react-admin'
import { Role, AuthResponse } from '../../gen-ts'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */

// Helper pour les requêtes API
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API Error: ${response.status}`)
    }

    if (response.status === 204) {
      return {} as T
    }

    return await response.json()
  } catch (err) {
    // Laisser l'appelant gérer l'erreur
    throw err
  }
}

// Vérifie si l'utilisateur a accès à une ressource/action
function canAccess(
  role: Role | null,
  resource: string,
  action: string,
  userId?: string,
  recordUserId?: string,
): boolean {
  if (!role) return false

  // ADMIN a tous les droits
  if (role === 'ADMIN') return true

  // Suppressions réservées ADMIN uniquement (sauf exceptions explicites)
  const deleteActions = ['delete', 'batch_delete']
  if (deleteActions.includes(action)) {
    // WAREHOUSE_WORKER peut supprimer travel_expenses
    if (role === 'WAREHOUSE_WORKER' && resource === 'travel_expenses') return true
    return false
  }

  const readActions = ['list', 'get']
  const writeActions = ['create', 'update', 'batch_create', 'batch_update']
  const crudActions = [...readActions, ...writeActions]

  const canReadWrite = (...actions: string[]) =>
    actions.some((a) => crudActions.includes(a))

  // =========================
  // Règles pour ADMINISTRATION
  // =========================
  if (role === 'ADMINISTRATION') {
    // Ressources avec CRUD complet (sauf delete)
    const fullCRUDResources = [
      'companies', 'users', 'jobs',
      'warehouses', 'equipment', 'materials', 'material_warehouse',
      'expenses', 'incomes', 'bank_fees', 'other_expenses', 'employee_payments',
      'purchases',
      'travel_expenses', 'travel_people', 'travel_materials', 'travel_equipment',
      'loans', 'income_types', 'income_receipts',
    ]
    if (fullCRUDResources.includes(resource) && canReadWrite(action)) return true

    // job_users : create et delete autorisés
    if (resource === 'job_users' && (action === 'create' || action === 'delete')) return true

    // Histoires : lecture seule
    if (resource === 'histories' && readActions.includes(action)) return true

    // Rapport annuel : lecture seule
    if (resource === 'yearly_report' && readActions.includes(action)) return true

    // Opérations : création
    if (resource === 'purchase_operations' && action === 'create') return true
    if (resource === 'travel_operations' && action === 'create') return true

    // Repayments liés aux loans
    if (resource === 'loan_repayments' && canReadWrite(action)) return true

    return false
  }

  // =========================
  // Règles pour WAREHOUSE_WORKER
  // =========================
  if (role === 'WAREHOUSE_WORKER') {
    // Lecture compagnies et utilisateurs
    if (resource === 'companies' && readActions.includes(action)) return true
    if (resource === 'users' && readActions.includes(action)) return true

    // CRUD (sauf delete) sur stock et achats
    const stockResources = ['warehouses', 'materials', 'material_warehouse', 'equipment', 'purchases']
    if (stockResources.includes(resource) && canReadWrite(action)) return true

    // Jobs : tout accès
    if (resource === 'jobs' && canReadWrite(action)) return true

    // Opérations d'achat
    if (resource === 'purchase_operations' && action === 'create') return true

    return false
  }

  // =========================
  // Règles pour EMPLOYEE
  // =========================
  if (role === 'EMPLOYEE') {
    // Lecture seule
    if (resource === 'companies' && action === 'get') return true
    if (resource === 'jobs' && action === 'get') return true
    if (resource === 'job_users' && action === 'list') return true
    if (resource === 'equipment' && ['list', 'get'].includes(action)) return true

    // Données personnelles (le backend filtre par #user_id)
    const personalResources = [
      'travel_expenses', 'other_expenses', 'employee_payments',
      'travel_people', 'travel_materials', 'travel_equipment',
    ]
    if (personalResources.includes(resource) && canReadWrite(action)) {
      return true
    }

    return false
  }

  return false
}

function localStorageInsertion(response: AuthResponse): void {
  localStorage.setItem('token', response.token as string)
  if (response.id != null) {
    localStorage.setItem('user_id', response.id)
  }
  if (response.email != null) {
    localStorage.setItem('user_email', response.email)
  }
  if (response.role != null) {
    localStorage.setItem('user_role', response.role)
  }
  localStorage.removeItem('not_authenticated')
  return true
}

const authProvider: AuthProvider = {
  login: async (params: any) => {
    // ⚠️ Attention: React Admin envoie 'username', pas 'email'
    // On utilise email ou username selon ce qui est passé
    const { email, password, username } = params as any
    const loginEmail = email ?? username
    const loginPassword = password

    console.log('🔐 Tentative de login avec:', { email: loginEmail })

    try {
      const response: AuthResponse = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })
      localStorageInsertion(response)

      return Promise.resolve()
    } catch (error) {
      console.error('❌ Login failed:', error)
      return Promise.reject(error)
    }
  },

  register: async (params: {
    email: string
    password: string
    first_name: string
    last_name: string
    sex: 'M' | 'F'
  }) => {
    console.log("📝 Tentative d'inscription:", { email: params.email })

    try {
      const response = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(params),
      })

      localStorageInsertion(response)

      return Promise.resolve()
    } catch (error) {
      console.error('❌ Inscription échouée:', error)
      return Promise.reject(error)
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_role')
    localStorage.setItem('not_authenticated', 'true')
    return Promise.resolve()
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.setItem('not_authenticated', 'true')
      return Promise.reject()
    }
    return Promise.resolve()
  },

  checkAuth: () => {
    const token = localStorage.getItem('token')
    const notAuthenticated = localStorage.getItem('not_authenticated')

    if (!token || notAuthenticated) {
      return Promise.reject()
    }
    return Promise.resolve()
  },

  getIdentity: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token')
      }

      const user = await apiRequest<AuthResponse>('/auth/whoami', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return Promise.resolve({
        id: user.id,
        fullName: user.email,
        email: user.email,
        role: user.role,
      })
    } catch (error) {
      const id = localStorage.getItem('user_id')
      const email = localStorage.getItem('user_email')
      const role = localStorage.getItem('user_role')

      if (!id) {
        return Promise.reject()
      }

      return Promise.resolve({
        id,
        fullName: email ?? id,
        email: email ?? id,
        role: role ?? 'EMPLOYEE',
      })
    }
  },

  canAccess: async ({ resource, action, record }: any) => {
    const role = (localStorage.getItem('user_role') as Role) || null
    const userId = localStorage.getItem('user_id') || undefined

    const personalResources = [
      'travel_expenses',
      'other_expenses',
      'employee_payments',
      'travel_people',
      'travel_materials',
      'travel_equipment',
    ]

    if (personalResources.includes(resource) && record?.user_id) {
      if (role === 'ADMIN' || role === 'ADMINISTRATION') {
        return true
      }
      return record.user_id === userId
    }

    return canAccess(role, resource, action, userId, record?.user_id)
  },

  getToken: () => {
    return localStorage.getItem('token') || null
  },
}

// Helper pour vérifier l'accès depuis n'importe où (synchrone, basé sur localStorage)
export const canAccessResource = (resource: string, action: string): boolean => {
  const role = (localStorage.getItem('user_role') as Role) || null
  return canAccess(role, resource, action)
}

// Helper pour ajouter le token aux requêtes fetch
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Configuration pour react-admin dataProvider
// Le token doit être ajouté à chaque requête
export const getFetchWithAuth = () => {
  const token = localStorage.getItem('token')
  return async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }
    return fetch(url, { ...options, headers })
  }
}

export default authProvider
