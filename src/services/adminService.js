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
