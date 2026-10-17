import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getMyBookings } from '@/services/bookingService.js'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const confirmedCount = computed(
    () => bookings.value.filter((booking) => booking.status === 'CONFIRMED').length,
  )

  function reset() {
    bookings.value = []
    isLoading.value = false
    errorMessage.value = ''
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

  return { bookings, isLoading, errorMessage, confirmedCount, reset, loadMyBookings }
})
