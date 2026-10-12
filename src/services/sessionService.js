const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

const categoryValues = {
  YOGA: 'yoga',
  AYURVEDA: 'ayurveda',
  KOMBUCHA_TEA_LOUNGE: 'lounge',
}

const levelLabels = {
  GENTLE_RESTORATIVE: 'Gentle / Restorative',
  ALL_LEVELS: 'All levels',
  ENERGETIC_FLOW: 'Energetic flow',
  BEGINNERS: 'Beginners',
}

function toHostValue(hosts) {
  const names = hosts.map((host) => host.name.toLowerCase())

  if (names.includes('mia') && names.includes('thor')) {
    return 'both'
  }

  return names[0] ?? ''
}

function addMinutes(time, minutesToAdd) {
  const [hours, minutes] = time.split(':').map(Number)
  const totalMinutes = (hours * 60 + minutes + minutesToAdd) % (24 * 60)
  const endHours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const endMinutes = String(totalMinutes % 60).padStart(2, '0')

  return `${endHours}:${endMinutes}`
}

export function toClassItem(session) {
  // startDateTime arrives as a LocalDateTime string, e.g. "2026-10-09T07:30:00"
  const [date, time] = session.startDateTime.split('T')
  const startTime = time.slice(0, 5)
  const category = categoryValues[session.category.name]

  return {
    id: session.id,
    category,
    host: toHostValue(session.hosts),
    title: session.title,
    level: levelLabels[session.level] ?? session.level,
    date,
    startTime,
    endTime: addMinutes(startTime, session.durationMinutes),
    duration: session.durationMinutes,
    location: session.location,
    guide: session.guide.name,
    description: session.description,
    focus: [],
    drinks: session.drinks,
  }
}

export async function getUpcomingSessions() {
  const response = await fetch(`${API_URL}/sessions`)

  if (!response.ok) {
    throw new Error(`Could not load sessions (status ${response.status})`)
  }

  const sessions = await response.json()

  return sessions.map(toClassItem)
}
