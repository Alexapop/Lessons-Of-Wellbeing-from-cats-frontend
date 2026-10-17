import axios from 'axios'

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

export function getBookingError(error) {
  if (!error.response) return 'Unable to reach the server. Please try again.'
  if (error.response.status === 400) {
    return error.response.data?.message ?? 'Please check your booking details.'
  }
  if (error.response.status === 404) return 'This session could not be found.'
  if (error.response.status === 409) return 'You have already booked this session.'
  return 'Booking is temporarily unavailable. Please try again later.'
}
