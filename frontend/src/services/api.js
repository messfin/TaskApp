import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/** Set by ClerkApiAuth when signed in; sends Bearer token to Express. */
let clerkGetToken = null
export function setClerkTokenGetter(fn) {
  clerkGetToken = typeof fn === 'function' ? fn : null
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(async (config) => {
  if (clerkGetToken) {
    try {
      const token = await clerkGetToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      console.warn('Auth token not attached:', e)
    }
  }
  return config
})

export const taskAPI = {
  // Get all tasks
  getAll: async () => {
    const response = await api.get('/tasks')
    return response.data.tasks
  },

  // Create a new task (text field)
  create: async (text) => {
    const response = await api.post('/tasks', { text })
    return response.data.task
  },

  // Update task text
  update: async (id, text) => {
    const response = await api.put(`/tasks/${id}`, { text })
    return response.data.task
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    const response = await api.patch(`/tasks/${id}/complete`)
    return response.data.task
  },

  // Delete a task
  delete: async (id) => {
    await api.delete(`/tasks/${id}`)
    return true
  }
}

export default api
