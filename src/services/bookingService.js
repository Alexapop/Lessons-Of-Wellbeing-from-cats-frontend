import axios from 'axios'
import { toClassItem } from '@/services/sessionService.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000,
})

export async function createBooking(booking, token) {
  const response = await api.post('/bookings', booking, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export function toBookingItem(booking) {
  return {
    id: booking.id,
    status: booking.status,
    notes: booking.notes ?? '',
    createdAt: booking.createdAt,
    session: toClassItem(booking.session),
  }
}

export async function getMyBookings(token) {
  const response = await api.get('/bookings/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data.map(toBookingItem)
}

export async function cancelBooking(bookingId, token) {
  const response = await api.delete(`/bookings/${encodeURIComponent(bookingId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return toBookingItem(response.data)
}

export function getCancelError(error) {
  if (!error.response) return 'Unable to reach the server. Please try again.'
  if (error.response.status === 404) return 'This booking could not be found.'
  if (error.response.status === 409) return 'This booking is already cancelled.'
  return 'Cancelling is temporarily unavailable. Please try again later.'
}

export function getBookingError(error) {
  if (!error.response) return 'Unable to reach the server. Please try again.'
  if (error.response.status === 400) {
    return error.response.data?.message ?? 'Please check your booking details.'
  }
  if (error.response.status === 403) return 'Admins cannot book sessions.'
  if (error.response.status === 404) return 'This session could not be found.'
  if (error.response.status === 409) return 'You have already booked this session.'
  return 'Booking is temporarily unavailable. Please try again later.'
}
