import { describe, it, expect } from 'vitest'

import { getBookingError } from '@/services/bookingService.js'

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
