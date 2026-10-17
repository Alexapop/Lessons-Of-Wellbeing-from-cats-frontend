import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import { getAdminDashboard } from '@/services/adminService.js'
import { loginUser } from '@/services/authService'

vi.mock('@/services/adminService.js', () => ({
  getAdminDashboard: vi.fn(),
}))

vi.mock('@/services/authService', () => ({
  loginUser: vi.fn(),
  getCurrentUser: vi.fn(),
}))

const Empty = { template: '<div />' }
const admin = { id: 1, firstName: 'Sanctuary', lastName: 'Admin', email: 'admin@example.com', role: 'ADMIN' }

async function mountAdmin() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Empty },
      { path: '/admin', name: 'admin', component: Empty },
      { path: '/admin/reservations', name: 'admin-reservations', component: Empty },
      { path: '/dashboard', name: 'dashboard', component: Empty },
      { path: '/class-calendar', name: 'class-calendar', component: Empty },
    ],
  })
  router.push('/admin')
  await router.isReady()

  const wrapper = mount(AdminDashboardView, { global: { plugins: [router] } })
  await flushPromises()
  return { wrapper, router }
}

describe('AdminDashboardView', () => {
  let auth
  let wrapper

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    setActivePinia(createPinia())
    loginUser.mockResolvedValue({ accessToken: 'admin-token', expiresIn: 900, user: admin })
    auth = useAuthStore()
    await auth.login(admin.email, 'AdminPassword123!')
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('loads the admin overview with the access token', async () => {
    getAdminDashboard.mockResolvedValue({
      totalSessions: 8,
      upcomingSessions: 6,
      confirmedReservations: 3,
      cancelledReservations: 1,
      registeredUsers: 12,
    })
    ;({ wrapper } = await mountAdmin())

    expect(getAdminDashboard).toHaveBeenCalledWith('admin-token')
    expect(wrapper.get('h1').text()).toBe('Admin dashboard')
    expect(wrapper.text()).toContain('Welcome, Sanctuary Admin.')
    expect(wrapper.text()).toContain('Registered users')
    expect(wrapper.text()).toContain('12')
  })

  it('sends non admins back to their dashboard when the backend answers 403', async () => {
    getAdminDashboard.mockRejectedValue({ response: { status: 403 } })
    let router
    ;({ wrapper, router } = await mountAdmin())

    expect(router.currentRoute.value.name).toBe('dashboard')
  })

  it('shows an error when the overview cannot be loaded', async () => {
    getAdminDashboard.mockRejectedValue({ response: { status: 500 } })
    ;({ wrapper } = await mountAdmin())

    expect(wrapper.get('[role="alert"]').text()).toContain('We could not load the admin overview.')
  })

  it('logs the admin out', async () => {
    getAdminDashboard.mockResolvedValue({
      totalSessions: 0,
      upcomingSessions: 0,
      confirmedReservations: 0,
      cancelledReservations: 0,
      registeredUsers: 0,
    })
    let router
    ;({ wrapper, router } = await mountAdmin())

    await wrapper.get('button').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('home')
    expect(auth.isAuthenticated).toBe(false)
  })
})
