import { afterEach, describe, it, expect, vi } from 'vitest'

import { getSessionError, getUpcomingSessions, toClassItem } from '@/services/sessionService.js'

const loungeSession = {
  id: 2,
  title: 'Kombucha Tea Tasting & Cat Meet & Greet',
  description: 'Enjoy homemade kombuchas.',
  level: 'ALL_LEVELS',
  location: 'The Garden Tea & Kombucha Lounge',
  startDateTime: '2026-10-09T16:30:00',
  durationMinutes: 90,
  category: { id: 3, name: 'KOMBUCHA_TEA_LOUNGE' },
  guide: { id: 2, name: 'Master Tea Artisan' },
  hosts: [
    { id: 1, name: 'Mia' },
    { id: 2, name: 'Thor' },
  ],
  drinks: ["Queen Mia's Royal Chamomile Lavender", 'Hibiscus Rose Sparkle Kombucha'],
}

describe('toClassItem', () => {
  it('maps a backend session to the shape used by the calendar', () => {
    expect(toClassItem(loungeSession)).toEqual({
      id: 2,
      category: 'lounge',
      host: 'both',
      title: 'Kombucha Tea Tasting & Cat Meet & Greet',
      level: 'All levels',
      date: '2026-10-09',
      startTime: '16:30',
      endTime: '18:00',
      duration: 90,
      location: 'The Garden Tea & Kombucha Lounge',
      guide: 'Master Tea Artisan',
      description: 'Enjoy homemade kombuchas.',
      focus: [],
      drinks: ["Queen Mia's Royal Chamomile Lavender", 'Hibiscus Rose Sparkle Kombucha'],
    })
  })

  it('maps a single host and a non-lounge category', () => {
    const classItem = toClassItem({
      ...loungeSession,
      category: { id: 1, name: 'YOGA' },
      level: 'GENTLE_RESTORATIVE',
      hosts: [{ id: 2, name: 'Thor' }],
      drinks: [],
    })

    expect(classItem.category).toBe('yoga')
    expect(classItem.host).toBe('thor')
    expect(classItem.level).toBe('Gentle / Restorative')
    expect(classItem.drinks).toEqual([])
  })
})

describe('getUpcomingSessions', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches the sessions endpoint and maps the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([loungeSession]),
    })
    vi.stubGlobal('fetch', fetchMock)

    const classes = await getUpcomingSessions()

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/sessions')
    expect(classes).toHaveLength(1)
    expect(classes[0].host).toBe('both')
  })

  it('throws when the backend answers with an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))

    await expect(getUpcomingSessions()).rejects.toThrow('status 500')
  })
})

describe('getSessionError', () => {
  it('explains network, 401 and 404 errors', () => {
    expect(getSessionError({})).toBe('Unable to reach the server. Please try again.')
    expect(getSessionError({ response: { status: 401 } })).toBe(
      'Please sign in again to reserve this session.',
    )
    expect(getSessionError({ response: { status: 404 } })).toBe('This session could not be found.')
  })
})
