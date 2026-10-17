import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingCard from '@/components/dashboard/BookingCard.vue'

function createBooking(overrides = {}) {
  return {
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
    ...overrides,
  }
}

describe('BookingCard', () => {
  it('shows status, notes, date, time, host and location', () => {
    const wrapper = mount(BookingCard, { props: { booking: createBooking() } })

    expect(wrapper.text()).toContain('Yoga')
    expect(wrapper.text()).toContain('Host: Mia')
    expect(wrapper.text()).toContain('Confirmed')
    expect(wrapper.text()).toContain('Queen Mia Restorative Cat Nap Yoga & Pranayama')
    expect(wrapper.text()).toContain('2026-10-12')
    expect(wrapper.text()).toContain('07:30 AM - 08:45 AM')
    expect(wrapper.text()).toContain('The Velvet Sun Lounge (Main Hall)')
    expect(wrapper.text()).toContain('"Note: ginger"')
  })

  it('formats afternoon times and shows both hosts', () => {
    const booking = createBooking()
    booking.session = {
      ...booking.session,
      category: 'lounge',
      host: 'both',
      startTime: '16:30',
      endTime: '18:00',
    }
    const wrapper = mount(BookingCard, { props: { booking } })

    expect(wrapper.text()).toContain('Kombucha Tea Lounge')
    expect(wrapper.text()).toContain('Host: Both')
    expect(wrapper.text()).toContain('04:30 PM - 06:00 PM')
  })

  it('shows Cancel Booking for confirmed bookings and emits cancel', async () => {
    const booking = createBooking()
    const wrapper = mount(BookingCard, { props: { booking } })

    await wrapper.get('button').trigger('click')

    expect(wrapper.get('button').text()).toBe('Cancel Booking')
    expect(wrapper.emitted('cancel')[0][0]).toEqual(booking)
  })

  it('hides Cancel Booking for cancelled bookings', () => {
    const wrapper = mount(BookingCard, { props: { booking: createBooking({ status: 'CANCELLED' }) } })

    expect(wrapper.text()).toContain('Cancelled')
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('hides the note when the booking has none', () => {
    const wrapper = mount(BookingCard, { props: { booking: createBooking({ notes: '' }) } })

    expect(wrapper.text()).not.toContain('Note:')
  })
})
