import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
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
