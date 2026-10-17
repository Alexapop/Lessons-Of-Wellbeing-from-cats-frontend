import { describe, it, expect } from 'vitest'

import { getBookingError, getCancelError, toBookingItem } from '@/services/bookingService.js'

describe('getBookingError', () => {
  it('uses the backend message for 400 errors', () => {
    const error = {
      response: { status: 400, data: { message: 'Please tell us your tea or kombucha preferences.' } },
    }

    expect(getBookingError(error)).toBe('Please tell us your tea or kombucha preferences.')
  })

  it('explains network, not found and server errors', () => {
    expect(getBookingError({})).toBe('Unable to reach the server. Please try again.')
    expect(getBookingError({ response: { status: 404 } })).toBe('This session could not be found.')
    expect(getBookingError({ response: { status: 409 } })).toBe('You have already booked this session.')
    expect(getBookingError({ response: { status: 500 } })).toBe(
      'Booking is temporarily unavailable. Please try again later.',
    )
  })
})

describe('getCancelError', () => {
  it('explains network, not found, conflict and server errors', () => {
    expect(getCancelError({})).toBe('Unable to reach the server. Please try again.')
    expect(getCancelError({ response: { status: 404 } })).toBe('This booking could not be found.')
    expect(getCancelError({ response: { status: 409 } })).toBe('This booking is already cancelled.')
    expect(getCancelError({ response: { status: 500 } })).toBe(
      'Cancelling is temporarily unavailable. Please try again later.',
    )
  })
})

describe('toBookingItem', () => {
  it('maps a backend booking with its session to the dashboard shape', () => {
    const item = toBookingItem({
      id: 10,
      status: 'CONFIRMED',
      notes: null,
      createdAt: '2026-10-01T09:00:00',
      session: {
        id: 2,
        title: 'Kombucha Tea Tasting & Cat Meet & Greet',
        description: 'Enjoy homemade kombuchas.',
        level: 'ALL_LEVELS',
        location: 'The Garden Tea & Kombucha Lounge',
        startDateTime: '2026-09-30T16:30:00',
        durationMinutes: 90,
        category: { id: 3, name: 'KOMBUCHA_TEA_LOUNGE' },
        guide: { id: 2, name: 'Master Tea Artisan' },
        hosts: [
          { id: 1, name: 'Mia' },
          { id: 2, name: 'Thor' },
        ],
        drinks: [],
      },
    })

    expect(item.id).toBe(10)
    expect(item.status).toBe('CONFIRMED')
    expect(item.notes).toBe('')
    expect(item.session).toMatchObject({
      category: 'lounge',
      host: 'both',
      date: '2026-09-30',
      startTime: '16:30',
      endTime: '18:00',
      location: 'The Garden Tea & Kombucha Lounge',
    })
  })
})
