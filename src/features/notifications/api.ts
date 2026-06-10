import { getMiddleUrlDynamicCompanyResource } from '../../config/dynamicResources'

export interface Notification {
  id: string
  user: { id: string; first_name: string; last_name: string }
  task_id: string | null
  title: string
  message: string
  read: boolean
  read_at: string | null
  completed: boolean
  completed_at: string | null
  effective_completed: boolean
  created_at: string
  updated_at: string
}

const getBase = () => getMiddleUrlDynamicCompanyResource('notifications')

const authHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  if (res.status === 204) return {} as T
  return res.json()
}

export const fetchUnreadCount = async (): Promise<number> => {
  const res = await fetch(`${getBase()}/unread_count`, { headers: authHeaders() })
  const data = await handleResponse<{ unread_count: number }>(res)
  return data.unread_count
}

export const fetchNotifications = async (page = 1, pageSize = 5): Promise<Notification[]> => {
  const params = new URLSearchParams({
    completed: 'false',
    page: String(page),
    page_size: String(pageSize),
  }).toString()
  const res = await fetch(`${getBase()}?${params}`, { headers: authHeaders() })
  return handleResponse<Notification[]>(res)
}

export const fetchNotificationById = async (id: string): Promise<Notification> => {
  const res = await fetch(`${getBase()}/${id}`, { headers: authHeaders() })
  return handleResponse<Notification>(res)
}

export const markAsRead = async (id: string): Promise<Notification> => {
  const res = await fetch(`${getBase()}/${id}/read`, {
    method: 'PUT',
    headers: authHeaders(),
  })
  return handleResponse<Notification>(res)
}

export const markAsComplete = async (id: string): Promise<Notification> => {
  const res = await fetch(`${getBase()}/${id}/complete`, {
    method: 'PUT',
    headers: authHeaders(),
  })
  return handleResponse<Notification>(res)
}

export const deleteNotification = async (id: string): Promise<void> => {
  const res = await fetch(`${getBase()}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  await handleResponse<void>(res)
}
