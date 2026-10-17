import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000,
})

export async function getAdminDashboard(token) {
  const response = await api.get('/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}
