import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import ReservationForm from '@/components/booking/ReservationForm.vue'
import { useAuthStore } from '@/stores/auth'
import { getSessionById } from '@/services/sessionService.js'
import { createBooking } from '@/services/bookingService.js'

vi.mock('@/services/sessionService.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getSessionById: vi.fn(),
}))

vi.mock('@/services/bookingService.js', async (importOriginal) => ({
  ...(await importOriginal()),
  createBooking: vi.fn(),
}))

const Empty = { template: '<div />' }

const session = {
  id: 7,
  title: 'Weekend Thor Playful Partner Yoga & Agility',
  date: '2026-10-13',
  startTime: '07:30',
  endTime: '09:00',
  duration: 90,
  location: 'Sunbeam Studio',
  guide: 'Leo',
  category: 'yoga',
  drinks: [],
}

const loungeSession = {
  ...session,
  id: 2,
  title: 'Kombucha Tea Tasting & Cat Meet & Greet',
  category: 'lounge',
  drinks: ['Hibiscus Rose Sparkle Kombucha'],
}

function confirmButton(wrapper) {
  return wrapper.get('button[type="submit"]')
}

async function mountForm() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Empty },
      { path: '/login', name: 'login', component: Empty },
      { path: '/dashboard', name: 'dashboard', component: Empty },
      { path: '/class-calendar', name: 'class-calendar', component: Empty },
    ],
  })
  router.push('/')
  await router.isReady()

  const wrapper = mount(ReservationForm, {
    props: { sessionId: '7' },
    global: { plugins: [router] },
  })
  await flushPromises()
  return { wrapper, router }
}

describe('ReservationForm', () => {
  let auth
  let wrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    auth = useAuthStore()
    auth.accessToken = 'token-123'
    auth.user = {
      id: 1,
      firstName: 'Elena',
      lastName: 'Vance',
      email: 'elena@example.com',
      phoneNumber: '+34 612 345 678',
    }
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.clearAllMocks()
  })

  it('loads the session with the access token and shows its summary', async () => {
    getSessionById.mockResolvedValue(session)
    ;({ wrapper } = await mountForm())

    expect(getSessionById).toHaveBeenCalledWith('7', 'token-123')
    expect(wrapper.text()).toContain('Weekend Thor Playful Partner Yoga & Agility')
    expect(wrapper.text()).toContain('Sunbeam Studio')
  })

  it('pre-fills name, email and phone from the signed-in user', async () => {
    getSessionById.mockResolvedValue(session)
    ;({ wrapper } = await mountForm())

    expect(wrapper.get('#reservation-name').element.value).toBe('Elena Vance')
    expect(wrapper.get('#reservation-email').element.value).toBe('elena@example.com')
    expect(wrapper.get('#reservation-phone').element.value).toBe('+34 612 345 678')
  })

  it('posts the booking and redirects to the dashboard when the form is valid', async () => {
    getSessionById.mockResolvedValue(session)
    createBooking.mockResolvedValue({ id: 10 })
    let router
    ;({ wrapper, router } = await mountForm())

    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const details = {
      name: 'Elena Vance',
      email: 'elena@example.com',
      phone: '+34 612 345 678',
      notes: '',
    }
    expect(createBooking).toHaveBeenCalledWith({ sessionId: 7, ...details }, 'token-123')
    expect(wrapper.emitted('confirm')[0][0]).toEqual({ sessionId: 7, ...details })
    expect(router.currentRoute.value.name).toBe('dashboard')
    expect(router.currentRoute.value.query.booking).toBe('confirmed')
  })

  it('stays on the form and shows the error when the booking fails', async () => {
    getSessionById.mockResolvedValue(session)
    createBooking.mockRejectedValue({ response: { status: 500 } })
    let router
    ;({ wrapper, router } = await mountForm())

    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Booking is temporarily unavailable. Please try again later.')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('does not ask for notes on non Kombucha/Tea sessions', async () => {
    getSessionById.mockResolvedValue(session)
    ;({ wrapper } = await mountForm())

    expect(wrapper.find('#reservation-notes').exists()).toBe(false)
    expect(confirmButton(wrapper).text()).toBe('Confirm Booking')
    expect(confirmButton(wrapper).attributes('disabled')).toBeUndefined()
  })

  it('disables Confirm Booking while the notes are empty on a Kombucha/Tea session', async () => {
    getSessionById.mockResolvedValue(loungeSession)
    ;({ wrapper } = await mountForm())

    expect(wrapper.find('#reservation-notes').exists()).toBe(true)
    expect(confirmButton(wrapper).attributes('disabled')).toBeDefined()

    await wrapper.get('#reservation-notes').setValue('   ')
    expect(confirmButton(wrapper).attributes('disabled')).toBeDefined()

    await wrapper.get('#reservation-notes').setValue('Hibiscus Rose, less sugar')
    expect(confirmButton(wrapper).attributes('disabled')).toBeUndefined()
  })

  it('shows a validation message when the notes field is left empty', async () => {
    getSessionById.mockResolvedValue(loungeSession)
    ;({ wrapper } = await mountForm())

    await wrapper.get('#reservation-notes').trigger('blur')

    expect(wrapper.get('#reservation-notes-error').text()).toBe(
      'Please tell us your tea or kombucha preferences.',
    )
    expect(wrapper.get('#reservation-notes').attributes('aria-invalid')).toBe('true')
  })

  it('sends the notes for a Kombucha/Tea session', async () => {
    getSessionById.mockResolvedValue(loungeSession)
    createBooking.mockResolvedValue({})
    ;({ wrapper } = await mountForm())

    await wrapper.get('#reservation-notes').setValue('  Hibiscus Rose, less sugar  ')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(createBooking).toHaveBeenCalledWith(
      expect.objectContaining({ sessionId: 2, notes: 'Hibiscus Rose, less sugar' }),
      'token-123',
    )
  })

  it('shows the backend message when the notes are rejected', async () => {
    getSessionById.mockResolvedValue(loungeSession)
    createBooking.mockRejectedValue({
      response: {
        status: 400,
        data: { status: 400, message: 'Please tell us your tea or kombucha preferences.' },
      },
    })
    ;({ wrapper } = await mountForm())

    await wrapper.get('#reservation-notes').setValue('Tea')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('#reservation-notes-error').text()).toBe(
      'Please tell us your tea or kombucha preferences.',
    )
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })

  it('shows validation errors and does not emit when a field is empty', async () => {
    getSessionById.mockResolvedValue(session)
    ;({ wrapper } = await mountForm())

    await wrapper.get('#reservation-phone').setValue('')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('Enter your phone number.')
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })

  it('shows a message when the session does not exist', async () => {
    getSessionById.mockRejectedValue({ response: { status: 404 } })
    ;({ wrapper } = await mountForm())

    expect(wrapper.get('[role="alert"]').text()).toContain('This session could not be found.')
  })

  it('signs out and goes to login when the token is rejected', async () => {
    getSessionById.mockRejectedValue({ response: { status: 401 } })
    let router
    ;({ wrapper, router } = await mountForm())

    expect(auth.isAuthenticated).toBe(false)
    expect(router.currentRoute.value.name).toBe('login')
  })
})
