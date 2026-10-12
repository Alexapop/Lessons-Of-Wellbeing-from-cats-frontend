// Same shape as ClassDTOResponse from the backend (GET /api/v1/sessions)
const mia = { id: 1, name: 'Mia' }
const thor = { id: 2, name: 'Thor' }

const loungeDrinks = [
  "Queen Mia's Royal Chamomile Lavender",
  "Thor's Spark Ginger Citrus Kombucha",
  'Feline Golden Milk & Cardamom Chai',
  'Hibiscus Rose Sparkle Kombucha',
]

const yoga = { id: 1, name: 'YOGA' }
const ayurveda = { id: 2, name: 'AYURVEDA' }
const lounge = { id: 3, name: 'KOMBUCHA_TEA_LOUNGE' }

export const sessions = [
  {
    id: 1,
    title: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
    description:
      'Slow-paced restorative yoga supported by bolsters, with deep breathing, hip openers, and quiet contemplation alongside Queen Mia.',
    level: 'GENTLE_RESTORATIVE',
    location: 'The Velvet Sun Lounge (Main Hall)',
    startDateTime: '2026-10-09T07:30:00',
    durationMinutes: 75,
    category: yoga,
    guide: { id: 1, name: 'Aria' },
    hosts: [mia],
    drinks: [],
  },
  {
    id: 2,
    title: 'Kombucha Tea Tasting & Cat Meet & Greet',
    description:
      'Enjoy homemade kombuchas and aromatic botanical teas while spending a relaxing afternoon with Mia and Thor.',
    level: 'ALL_LEVELS',
    location: 'The Garden Tea & Kombucha Lounge',
    startDateTime: '2026-10-09T16:30:00',
    durationMinutes: 90,
    category: lounge,
    guide: { id: 2, name: 'Master Tea Artisan' },
    hosts: [mia, thor],
    drinks: loungeDrinks,
  },
  {
    id: 3,
    title: 'Thor’s Morning Feline Flow & Cat-Cow Vinyasa',
    description:
      'A playful yoga sequence inspired by cat movements, with fluid spinal waves, warrior stretches, and energetic balance.',
    level: 'ENERGETIC_FLOW',
    location: 'Sunbeam Studio',
    startDateTime: '2026-10-10T07:45:00',
    durationMinutes: 75,
    category: yoga,
    guide: { id: 3, name: 'Leo' },
    hosts: [thor],
    drinks: [],
  },
  {
    id: 4,
    title: 'Ayurveda & Feline Self-Care Workshop',
    description:
      'Explore Ayurvedic traditions and gentle daily self-care rituals, including massage, herbal teas, and seasonal routines.',
    level: 'ALL_LEVELS',
    location: 'Ayurveda Wisdom Room',
    startDateTime: '2026-10-10T17:00:00',
    durationMinutes: 90,
    category: ayurveda,
    guide: { id: 4, name: 'Dr. Priya (Ayurvedic Practitioner)' },
    hosts: [mia],
    drinks: [],
  },
  {
    id: 5,
    title: 'Sunset Yin Yoga & Purr Sound Bath',
    description:
      'Long-held Yin stretches accompanied by singing bowls and cat purring for a calm transition into the evening.',
    level: 'GENTLE_RESTORATIVE',
    location: 'The Velvet Sun Lounge',
    startDateTime: '2026-10-12T18:30:00',
    durationMinutes: 75,
    category: yoga,
    guide: { id: 5, name: 'Elena' },
    hosts: [mia, thor],
    drinks: [],
  },
  {
    id: 6,
    title: 'Evening Kombucha, Golden Milk & Tea Lounge Session',
    description:
      'Relax with warm golden milk or seasonal kombucha, read a wellbeing book, and enjoy the company of Mia and Thor.',
    level: 'ALL_LEVELS',
    location: 'The Garden Tea & Kombucha Lounge',
    startDateTime: '2026-10-12T19:30:00',
    durationMinutes: 90,
    category: lounge,
    guide: { id: 6, name: 'Lounge Host' },
    hosts: [mia, thor],
    drinks: loungeDrinks,
  },
  {
    id: 7,
    title: 'Weekend Thor Playful Partner Yoga & Agility',
    description:
      'Partner and solo yoga poses exploring balance, laughter, and playful movement, with Thor watching the humans stretch.',
    level: 'BEGINNERS',
    location: 'Sunbeam Studio',
    startDateTime: '2026-10-13T07:30:00',
    durationMinutes: 90,
    category: yoga,
    guide: { id: 3, name: 'Leo' },
    hosts: [thor],
    drinks: [],
  },
  {
    id: 8,
    title: 'Ayurvedic Tea Blending & Mindful Sip Masterclass',
    description:
      'Create a botanical tea blend with guidance from the tea artisan and enjoy a mindful tasting supervised by Queen Mia.',
    level: 'ALL_LEVELS',
    location: 'Ayurveda Wisdom Room',
    startDateTime: '2026-10-14T18:00:00',
    durationMinutes: 90,
    category: ayurveda,
    guide: { id: 2, name: 'Master Tea Artisan' },
    hosts: [mia],
    drinks: [],
  },
]
