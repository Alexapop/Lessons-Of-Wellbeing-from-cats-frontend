import { afterEach, describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import HeroSection from '@/components/home/HeroSection.vue'
import MiaThorSection from '@/components/home/MiaThorSection.vue'
import YogaAyurvedaSection from '@/components/home/YogaAyurvedaSection.vue'
import KombuchaTeaLoungeSection from '@/components/home/KombuchaTeaLoungeSection.vue'
import LessonCard from '@/components/lessons/LessonCard.vue'
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

function hrefOf(wrapper, text) {
  const link = wrapper.findAll('a').find((anchor) => anchor.text().includes(text))

  expect(link, `link "${text}"`).toBeDefined()

  return link.attributes('href')
}

function pressedFilters(wrapper) {
  return wrapper.findAll('[aria-pressed="true"]').map((button) => button.text())
}

const lesson = {
  id: 1,
  host: 'Thor',
  title: 'The Art of the Slow Starting',
  text: 'Wake up slowly.',
  image: 'lesson.png',
  imageAlt: 'Thor resting',
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

describe('LessonCard', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('hides the lesson text until the title is clicked', async () => {
    wrapper = await mountWithRouter(LessonCard, { props: { lesson }, attachTo: document.body })
    const toggle = wrapper.get('.lesson-card__toggle')
    const details = wrapper.get('.lesson-card__details')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(details.isVisible()).toBe(false)

    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(details.isVisible()).toBe(true)

    await toggle.trigger('click')

    expect(details.isVisible()).toBe(false)
  })

  it('links "Practice in Class" to the calendar filtered by the lesson host', async () => {
    wrapper = await mountWithRouter(LessonCard, { props: { lesson } })

    expect(hrefOf(wrapper, 'Practice in Class')).toBe('/class-calendar?host=thor')
  })
})

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
