import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000,
})

export async function loginUser(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function getCurrentUser(token) {
  const response = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export function getLoginError(error) {
  if (!error.response) return 'Unable to reach the server. Please try again.'
  if (error.response.status === 401) return 'Invalid email or password.'
  if (error.response.status === 400) return 'Please check your email and password.'
  return 'Sign in is temporarily unavailable. Please try again later.'
}
