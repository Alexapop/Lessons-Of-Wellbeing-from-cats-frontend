<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import UserProfileCard from '@/components/dashboard/UserProfileCard.vue'
import BookingCard from '@/components/dashboard/BookingCard.vue'
import { getCancelError } from '@/services/bookingService.js'

const auth = useAuthStore()
const bookingsStore = useBookingsStore()
const route = useRoute()
const router = useRouter()
const errorMessage = ref('')
const statusMessage = ref('')
const bookingConfirmed = computed(() => route.query.booking === 'confirmed')

async function loadProfile() {
  errorMessage.value = ''
  try {
    await auth.refreshUser()
  } catch (error) {
    if (error.response?.status !== 401) {
      errorMessage.value = 'Unable to load your profile. Please try again.'
    }
  }
}

async function logout() {
  await router.replace({ name: 'home' })
  auth.logout()
}

async function cancelBooking(booking) {
  statusMessage.value = ''
  try {
    await bookingsStore.cancelBooking(booking.id)
    statusMessage.value = `Your booking for “${booking.session.title}” has been cancelled.`
  } catch (error) {
    if (error.response?.status === 401) return
    statusMessage.value = getCancelError(error)
  }
}

onMounted(() => {
  loadProfile()
  bookingsStore.loadMyBookings()
})
</script>

<template>
  <main class="dashboard" aria-labelledby="dashboard-title">
    <h1 id="dashboard-title" class="visually-hidden">Your dashboard</h1>

    <p v-if="bookingConfirmed" class="dashboard__success" role="status">
      Your booking is confirmed. We look forward to seeing you!
    </p>

    <div v-if="errorMessage" class="dashboard__error" role="alert">
      <p>{{ errorMessage }}</p>
      <button class="dashboard__secondary" type="button" @click="loadProfile">Try again</button>
    </div>

    <UserProfileCard v-if="auth.user" :user="auth.user" @logout="logout" />

    <section class="dashboard__reservations" aria-labelledby="reservations-title">
      <header class="dashboard__reservations-header">
        <h2 id="reservations-title" class="dashboard__reservations-title">
          <svg class="dashboard__icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 11h18" />
          </svg>
          Your Reservations ({{ bookingsStore.confirmedCount }})
        </h2>

        <RouterLink class="dashboard__primary" :to="{ name: 'class-calendar' }">
          + Reserve more classes or tea &amp; kombucha visits
        </RouterLink>
      </header>

      <p class="dashboard__status" role="status">{{ statusMessage }}</p>

      <p v-if="bookingsStore.isLoading" class="dashboard__muted" role="status">
        Loading your reservations...
      </p>

      <div v-else-if="bookingsStore.errorMessage" class="dashboard__error" role="alert">
        <p>{{ bookingsStore.errorMessage }}</p>
        <button class="dashboard__secondary" type="button" @click="bookingsStore.loadMyBookings">
          Try again
        </button>
      </div>

      <p v-else-if="bookingsStore.bookings.length === 0" class="dashboard__empty">
        You have no reservations yet.
      </p>

      <div v-else class="dashboard__list">
        <BookingCard
          v-for="booking in bookingsStore.bookings"
          :key="booking.id"
          :booking="booking"
          :is-cancelling="bookingsStore.cancellingId === booking.id"
          @cancel="cancelBooking"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: 1200px;
  margin: 5rem auto;
  min-height: 40vh;
}

.dashboard__success {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #00664f;
  color: #00664f;
  font-weight: 700;
}

.dashboard__reservations {
  margin-top: 2.5rem;
}

.dashboard__reservations-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.dashboard__reservations-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.dashboard__icon {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dashboard__primary {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.6rem 1.25rem;
  background-color: var(--color-text);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.dashboard__secondary {
  min-height: 2.75rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: 700;
  cursor: pointer;
}

.dashboard__primary:focus-visible,
.dashboard__secondary:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.dashboard__list {
  display: grid;
  gap: 1rem;
}

.dashboard__status {
  margin: 0 0 1rem;
  color: var(--color-text-secondary);
}

.dashboard__status:empty {
  display: none;
}

.dashboard__muted,
.dashboard__empty {
  color: var(--color-text-secondary);
}

.dashboard__empty,
.dashboard__error {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.dashboard__error {
  margin-bottom: 1.5rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 700px) {
  .dashboard {
    margin: 2.5rem auto;
  }

  .dashboard__reservations-title {
    font-size: 1.5rem;
  }

  .dashboard__primary {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>
