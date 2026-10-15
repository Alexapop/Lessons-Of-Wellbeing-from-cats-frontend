import { afterEach, describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ClassCalendarHero from '@/components/calendar/ClassCalendarHero.vue'

describe('ClassCalendarHero', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('displays the calendar title', () => {
    wrapper = mount(ClassCalendarHero)

    expect(wrapper.get('h1').text()).toBe(
      'Class & Lounge Visit Calendar',
    )
  })

  it('explains that registration and login are required', () => {
    wrapper = mount(ClassCalendarHero)

    expect(wrapper.text()).toContain(
      'You must be registered and logged in to make a reservation.',
    )
  })

  it('displays opening hours and the Sunday closure', () => {
    wrapper = mount(ClassCalendarHero)

    expect(wrapper.text()).toContain(
      'Mon - Sat: 7:30 AM - 9:00 AM & 4:30 PM - 9:00 PM',
    )

    expect(wrapper.text()).toContain(
      "Closed on Sundays for Mia's Royal Nap",
    )
  })
})
