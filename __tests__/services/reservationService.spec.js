import { describe, it, expect } from 'vitest'

import { getReservationError } from '@/services/reservationService.js'

describe('getReservationError', () => {
  it('uses the backend message for 400 errors', () => {
    const error = { response: { status: 400, data: { message: 'Please tell us your tea or kombucha preferences.' } } }

    expect(getReservationError(error)).toBe('Please tell us your tea or kombucha preferences.')
  })

  it('explains network and not found errors', () => {
    expect(getReservationError({})).toBe('Unable to reach the server. Please try again.')
    expect(getReservationError({ response: { status: 404 } })).toBe('This session could not be found.')
  })
})
