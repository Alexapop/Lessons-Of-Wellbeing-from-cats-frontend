import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import LessonCard from '@/components/lessons/LessonCard.vue'

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

const lesson = {
  id: 1,
  host: 'Thor',
  title: 'The Art of the Slow Starting',
  text: 'Wake up slowly.',
  image: 'lesson.png',
  imageAlt: 'Thor resting',
}

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

