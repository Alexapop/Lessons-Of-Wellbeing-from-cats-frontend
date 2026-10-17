import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import ReservationForm from '@/components/booking/ReservationForm.vue'
import { useAuthStore } from '@/stores/auth'
import { getSessionById } from '@/services/sessionService.js'

vi.mock('@/services/sessionService.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getSessionById: vi.fn(),
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
}

async function mountForm() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Empty },
      { path: '/login', name: 'login', component: Empty },
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

  it('emits the reservation details when the form is valid', async () => {
    getSessionById.mockResolvedValue(session)
    ;({ wrapper } = await mountForm())

    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('confirm')[0][0]).toEqual({
      sessionId: 7,
      name: 'Elena Vance',
      email: 'elena@example.com',
      phone: '+34 612 345 678',
    })
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
