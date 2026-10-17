import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import { getMyBookings } from '@/services/bookingService.js'
import { getCurrentUser } from '@/services/authService'

vi.mock('@/services/bookingService.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getMyBookings: vi.fn(),
}))

vi.mock('@/services/authService', async (importOriginal) => ({
  ...(await importOriginal()),
  getCurrentUser: vi.fn(),
  loginUser: vi.fn(),
}))

const Empty = { template: '<div />' }

const user = {
  id: 1,
  firstName: 'Sophea',
  lastName: 'Lin',
  email: 'sophea@feline-wellbeing.org',
  phoneNumber: '+1 (415) 555-0192',
  address: '450 Post Street, San Francisco, CA 94102',
}

const confirmedBooking = {
  id: 1,
  status: 'CONFIRMED',
  notes: 'ginger',
  session: {
    id: 1,
    category: 'yoga',
    host: 'mia',
    title: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
    date: '2026-10-12',
    startTime: '07:30',
    endTime: '08:45',
    location: 'The Velvet Sun Lounge (Main Hall)',
  },
}

const cancelledBooking = {
  ...confirmedBooking,
  id: 2,
  status: 'CANCELLED',
  notes: '',
  session: { ...confirmedBooking.session, id: 2, title: 'Sunset Yin Yoga & Purr Sound Bath' },
}

async function mountDashboard() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Empty },
      { path: '/dashboard', name: 'dashboard', component: Empty },
      { path: '/class-calendar', name: 'class-calendar', component: Empty },
    ],
  })
  router.push('/dashboard')
  await router.isReady()

  const wrapper = mount(DashboardView, { global: { plugins: [router] } })
  await flushPromises()
  return { wrapper, router }
}

describe('DashboardView', () => {
  let auth
  let wrapper

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    setActivePinia(createPinia())
    const { loginUser } = await import('@/services/authService')
    loginUser.mockResolvedValue({ accessToken: 'token-123', expiresIn: 900, user })
    getCurrentUser.mockResolvedValue(user)
    auth = useAuthStore()
    await auth.login('sophea@feline-wellbeing.org', 'TestPassword123!')
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('shows the user profile', async () => {
    getMyBookings.mockResolvedValue([])
    ;({ wrapper } = await mountDashboard())

    expect(wrapper.text()).toContain('Sophea Lin')
    expect(wrapper.text()).toContain('@sophealin')
    expect(wrapper.text()).toContain('sophea@feline-wellbeing.org')
    expect(wrapper.text()).toContain('+1 (415) 555-0192')
    expect(wrapper.text()).toContain('450 Post Street, San Francisco, CA 94102')
  })

  it('loads all bookings of the user with the access token', async () => {
    getMyBookings.mockResolvedValue([confirmedBooking, cancelledBooking])
    ;({ wrapper } = await mountDashboard())

    expect(getMyBookings).toHaveBeenCalledWith('token-123')
    expect(wrapper.text()).toContain('Your Reservations (2)')
    expect(wrapper.findAll('article')).toHaveLength(2)
  })

  it('shows Cancel Booking only for confirmed bookings', async () => {
    getMyBookings.mockResolvedValue([confirmedBooking, cancelledBooking])
    ;({ wrapper } = await mountDashboard())

    const cancelButtons = wrapper
      .findAll('button')
      .filter((button) => button.text() === 'Cancel Booking')
    expect(cancelButtons).toHaveLength(1)
  })

  it('shows an empty state when there are no bookings', async () => {
    getMyBookings.mockResolvedValue([])
    ;({ wrapper } = await mountDashboard())

    expect(wrapper.text()).toContain('Your Reservations (0)')
    expect(wrapper.text()).toContain('You have no reservations yet.')
  })

  it('shows an error when the bookings cannot be loaded', async () => {
    getMyBookings.mockRejectedValue({ response: { status: 500 } })
    ;({ wrapper } = await mountDashboard())

    expect(wrapper.get('[role="alert"]').text()).toContain('We could not load your reservations.')
  })

  it('logs out from the profile card', async () => {
    getMyBookings.mockResolvedValue([])
    let router
    ;({ wrapper, router } = await mountDashboard())

    const logoutButton = wrapper.findAll('button').find((button) => button.text() === 'Logout')
    await logoutButton.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('home')
    expect(auth.isAuthenticated).toBe(false)
  })
})
