import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import HeroSection from '@/components/home/HeroSection.vue'
import MiaThorSection from '@/components/home/MiaThorSection.vue'
import YogaAyurvedaSection from '@/components/home/YogaAyurvedaSection.vue'
import KombuchaTeaLoungeSection from '@/components/home/KombuchaTeaLoungeSection.vue'

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

function hrefOf(wrapper, text) {
  const link = wrapper.findAll('a').find((anchor) => anchor.text().includes(text))

  expect(link, `link "${text}"`).toBeDefined()

  return link.attributes('href')
}

describe('Home page buttons', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('links the hero actions to the calendar and the wellbeing lessons', async () => {
    wrapper = await mountWithRouter(HeroSection)

    expect(hrefOf(wrapper, 'Reserve class or visit')).toBe('/class-calendar')
    expect(hrefOf(wrapper, 'Read wellbeing lessons')).toBe('/wellbeing-lessons')
  })

  it('links each cat card to the calendar filtered by its host', async () => {
    wrapper = await mountWithRouter(MiaThorSection)

    expect(hrefOf(wrapper, 'Reserve class with Mia')).toBe('/class-calendar?host=mia')
    expect(hrefOf(wrapper, 'Reserve class with Thor')).toBe('/class-calendar?host=thor')
  })

  it('links the yoga and lounge sections to the calendar filtered by category', async () => {
    wrapper = await mountWithRouter(YogaAyurvedaSection)
    expect(wrapper.find('a[href="/class-calendar?category=yoga"]').exists()).toBe(true)
    wrapper.unmount()

    wrapper = await mountWithRouter(KombuchaTeaLoungeSection)
    expect(wrapper.find('a[href="/class-calendar?category=lounge"]').exists()).toBe(true)
  })

  it('no longer renders disabled reservation buttons', async () => {
    for (const component of [
      HeroSection,
      MiaThorSection,
      YogaAyurvedaSection,
      KombuchaTeaLoungeSection,
    ]) {
      wrapper = await mountWithRouter(component)
      expect(wrapper.find('button[disabled]').exists()).toBe(false)
      wrapper.unmount()
    }

    wrapper = undefined
  })
})

