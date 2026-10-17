import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { loginUser, getCurrentUser } from '@/services/authService'

vi.mock('@/services/authService', () => ({
  loginUser: vi.fn(),
  getCurrentUser: vi.fn(),
}))

const profile = { id: 1, firstName: 'Elena', lastName: 'Pop', email: 'elena@example.com', role: 'USER' }

describe('Authentication state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.resetAllMocks()
    loginUser.mockResolvedValue({ accessToken: 'signed-token', user: profile, expiresIn: 900 })
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('stores the user in memory and clears authentication on logout', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')
    expect(auth.fullName).toBe('Elena Pop')
    expect(auth.hasValidSession()).toBe(true)
    auth.logout()
    expect(auth.accessToken).toBeNull()
    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('detects a regular user and sends them to the dashboard', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')

    expect(auth.isAdmin).toBe(false)
    expect(auth.homeRoute).toBe('dashboard')
  })

  it('detects the admin role and sends admins to /admin', async () => {
    loginUser.mockResolvedValue({
      accessToken: 'signed-token',
      user: { ...profile, role: 'ADMIN' },
      expiresIn: 900,
    })
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')

    expect(auth.isAdmin).toBe(true)
    expect(auth.homeRoute).toBe('admin')

    auth.logout()
    expect(auth.isAdmin).toBe(false)
  })

  it('clears the session when the token expires', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')
    vi.advanceTimersByTime(900000)
    expect(auth.hasValidSession()).toBe(false)
  })

  it('does not authenticate after failed login', async () => {
    loginUser.mockRejectedValue({ response: { status: 401 } })
    const auth = useAuthStore()
    await expect(auth.login(profile.email, 'wrong')).rejects.toBeDefined()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('sends the token to the profile service and clears rejected authentication', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')
    getCurrentUser.mockRejectedValue({ response: { status: 401 } })
    await expect(auth.refreshUser()).rejects.toBeDefined()
    expect(getCurrentUser).toHaveBeenCalledWith('signed-token')
    expect(auth.isAuthenticated).toBe(false)
  })

  it('does not restore the profile when a request finishes after logout', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')
    let resolveProfile
    getCurrentUser.mockReturnValue(new Promise((resolve) => { resolveProfile = resolve }))
    const pending = auth.refreshUser()
    auth.logout()
    resolveProfile(profile)
    await pending
    expect(auth.user).toBeNull()
  })

  it('keeps the session during a temporary server failure', async () => {
    const auth = useAuthStore()
    await auth.login(profile.email, 'password')
    getCurrentUser.mockRejectedValue(new Error('Network failure'))
    await expect(auth.refreshUser()).rejects.toBeDefined()
    expect(auth.isAuthenticated).toBe(true)
  })
})
