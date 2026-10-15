import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import ClassCalendarSection from '@/components/calendar/ClassCalendarSection.vue'

const Empty = { template: '<div />' }

async function createTestRouter(initialPath = '/') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Empty },
      { path: '/wellbeing-lessons', name: 'wellbeing-lessons', component: Empty },
      { path: '/class-calendar', name: 'class-calendar', component: Empty },
    ],
  })

  router.push(initialPath)
  await router.isReady()

  return router
}

async function mountWithRouter(component, options = {}, initialPath = '/') {
  const router = await createTestRouter(initialPath)

  return mount(component, {
    ...options,
    global: { plugins: [router] },
  })
}

function pressedFilters(wrapper) {
  return wrapper.findAll('[aria-pressed="true"]').map((button) => button.text())
}

describe('ClassCalendarSection filters from the URL', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('starts with every filter set to all when the URL has no query', async () => {
    wrapper = await mountWithRouter(ClassCalendarSection, {}, '/class-calendar')

    expect(pressedFilters(wrapper)).toEqual(['All', 'All Hosts'])
  })

  it('preselects the host from the URL', async () => {
    wrapper = await mountWithRouter(ClassCalendarSection, {}, '/class-calendar?host=mia')

    expect(pressedFilters(wrapper)).toEqual(['All', 'Mia'])
  })

  it('preselects the category from the URL', async () => {
    wrapper = await mountWithRouter(ClassCalendarSection, {}, '/class-calendar?category=lounge')

    expect(pressedFilters(wrapper)).toEqual(['Kombucha Tea Lounge', 'All Hosts'])
  })

  it('ignores unknown filter values in the URL', async () => {
    wrapper = await mountWithRouter(
      ClassCalendarSection,
      {},
      '/class-calendar?category=karate&host=garfield',
    )

    expect(pressedFilters(wrapper)).toEqual(['All', 'All Hosts'])
  })
})
