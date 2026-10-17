import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { cancelBooking as cancelBookingRequest, getMyBookings } from '@/services/bookingService.js'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const cancellingId = ref(null)

  const confirmedCount = computed(
    () => bookings.value.filter((booking) => booking.status === 'CONFIRMED').length,
  )

  function reset() {
    bookings.value = []
    isLoading.value = false
    errorMessage.value = ''
    cancellingId.value = null
  }

  // Replaces the booking with the cancelled version returned by the backend, so the list updates.
  async function cancelBooking(bookingId) {
    const auth = useAuthStore()
    if (!auth.hasValidSession()) return null

    cancellingId.value = bookingId
    try {
      const cancelled = await cancelBookingRequest(bookingId, auth.accessToken)
      bookings.value = bookings.value.map((booking) =>
        booking.id === cancelled.id ? cancelled : booking,
      )
      return cancelled
    } catch (error) {
      if (error.response?.status === 401) auth.logout()
      throw error
    } finally {
      cancellingId.value = null
    }
  }

  async function loadMyBookings() {
    const auth = useAuthStore()
    if (!auth.hasValidSession()) return

    const token = auth.accessToken
    isLoading.value = true
    errorMessage.value = ''

    try {
      const result = await getMyBookings(token)
      if (auth.accessToken === token) bookings.value = result
    } catch (error) {
      if (error.response?.status === 401 && auth.accessToken === token) {
        auth.logout()
        return
      }
      errorMessage.value = 'We could not load your reservations. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    bookings,
    isLoading,
    errorMessage,
    cancellingId,
    confirmedCount,
    reset,
    loadMyBookings,
    cancelBooking,
  }
})
