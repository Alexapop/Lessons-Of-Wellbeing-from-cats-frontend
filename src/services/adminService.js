import axios from 'axios'
import { toBookingItem } from '@/services/bookingService.js'

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

export async function getAllBookings(token) {
  const response = await api.get('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data.map((booking) => ({ ...toBookingItem(booking), user: booking.user }))
}

export async function getSessionOptions(token) {
  const response = await api.get('/admin/session-options', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export async function createSession(session, token) {
  const response = await api.post('/admin/sessions', session, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

// Raw session (with ids for category, guide and hosts) used to pre-fill the edit form.
export async function getSessionForEdit(id, token) {
  const response = await api.get(`/sessions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export async function updateSession(id, session, token) {
  const response = await api.put(`/admin/sessions/${encodeURIComponent(id)}`, session, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export function getCreateSessionError(error) {
  if (!error.response) return 'Unable to reach the server. Please try again.'
  if (error.response.status === 400) {
    return error.response.data?.message ?? 'Please check the session details.'
  }
  if (error.response.status === 404) return 'This session could not be found.'
  return 'Saving sessions is temporarily unavailable. Please try again later.'
}
