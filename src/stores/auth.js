import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUser, loginUser } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // Tokens stay in memory and are discarded when the page reloads.
  const accessToken = ref(null)
  const user = ref(null)
  const expiresAt = ref(0)
  let expirationTimer

  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))
  const fullName = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(' '),
  )

  function logout() {
    clearTimeout(expirationTimer)
    accessToken.value = null
    user.value = null
    expiresAt.value = 0
  }

  function hasValidSession() {
    if (!isAuthenticated.value || Date.now() >= expiresAt.value) {
      logout()
      return false
    }
    return true
  }

  async function login(email, password) {
    const data = await loginUser(email, password)
    if (!data.accessToken || !data.user || !(data.expiresIn > 0)) {
      throw new Error('Invalid login response.')
    }
    logout()
    accessToken.value = data.accessToken
    user.value = data.user
    expiresAt.value = Date.now() + data.expiresIn * 1000
    expirationTimer = setTimeout(logout, data.expiresIn * 1000)
  }

  async function refreshUser() {
    if (!hasValidSession()) return
    const token = accessToken.value
    try {
      const currentUser = await getCurrentUser(token)
      if (accessToken.value === token) user.value = currentUser
    } catch (error) {
      if (error.response?.status === 401 && accessToken.value === token) logout()
      throw error
    }
  }

  return { accessToken, user, fullName, isAuthenticated, login, logout, hasValidSession, refreshUser }
})
