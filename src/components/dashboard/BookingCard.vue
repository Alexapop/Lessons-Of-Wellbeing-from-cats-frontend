<script setup>
import { computed } from 'vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cancel'])

const categoryLabels = {
  yoga: 'Yoga',
  ayurveda: 'Ayurveda',
  lounge: 'Kombucha Tea Lounge',
}

const hostLabels = {
  mia: 'Mia',
  thor: 'Thor',
  both: 'Both',
}

const statusLabels = {
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
}

function to12Hour(time) {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = String(hours % 12 || 12).padStart(2, '0')

  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`
}

const session = computed(() => props.booking.session)
const isConfirmed = computed(() => props.booking.status === 'CONFIRMED')
const timeRange = computed(
  () => `${to12Hour(session.value.startTime)} - ${to12Hour(session.value.endTime)}`,
)
</script>

<template>
  <article class="booking-card" :aria-labelledby="`booking-title-${booking.id}`">
    <div class="booking-card__content">
      <div class="booking-card__meta">
        <span class="booking-card__category">{{ categoryLabels[session.category] }}</span>
        <span class="booking-card__host">Host: {{ hostLabels[session.host] }}</span>
        <span
          class="booking-card__status"
          :class="`booking-card__status--${booking.status.toLowerCase()}`"
        >
          {{ statusLabels[booking.status] ?? booking.status }}
        </span>
      </div>

      <h3 :id="`booking-title-${booking.id}`" class="booking-card__title">{{ session.title }}</h3>

      <p class="booking-card__details">
        <svg class="booking-card__icon booking-card__icon--date" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
        <time :datetime="session.date">{{ session.date }}</time>
        <span aria-hidden="true">•</span>
        <span>{{ timeRange }}</span>
        <span aria-hidden="true">•</span>
        <svg class="booking-card__icon booking-card__icon--location" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{{ session.location }}</span>
      </p>

      <p v-if="booking.notes" class="booking-card__notes">"Note: {{ booking.notes }}"</p>
    </div>

    <button
      v-if="isConfirmed"
      class="booking-card__cancel"
      type="button"
      @click="emit('cancel', booking)"
    >
      <svg class="booking-card__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-6 6M9 9l6 6" />
      </svg>
      Cancel Booking
    </button>
  </article>
</template>

<style scoped>
.booking-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  overflow-wrap: anywhere;
}

.booking-card__content {
  min-width: 0;
}

.booking-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.booking-card__category,
.booking-card__host,
.booking-card__status {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.booking-card__category {
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--color-border);
  background-color: #f5f5f4;
}

.booking-card__host {
  color: var(--color-heading);
}

.booking-card__status {
  padding: 0.25rem 0.6rem;
  border: 1px solid currentColor;
}

.booking-card__status--confirmed {
  color: #00664f;
  background-color: #ecfdf5;
}

.booking-card__status--cancelled {
  color: #78716c;
  background-color: #f5f5f4;
}

.booking-card__title {
  margin: 0.6rem 0 0.4rem;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.3;
}

.booking-card__details {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.booking-card__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.booking-card__icon--date {
  color: #6366f1;
}

.booking-card__icon--location {
  color: #e11d48;
}

.booking-card__notes {
  margin: 0.4rem 0 0;
  color: #78716c;
  font-size: 0.8rem;
  font-style: italic;
}

.booking-card__cancel {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #fda4af;
  background-color: var(--color-background);
  color: #be123c;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.booking-card__cancel:hover {
  background-color: #fff1f2;
}

.booking-card__cancel:focus-visible {
  outline: 2px solid #be123c;
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .booking-card {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
  }

  .booking-card__cancel {
    justify-content: center;
  }
}
</style>
