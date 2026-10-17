<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getAllBookings } from '@/services/adminService.js'

const auth = useAuthStore()
const router = useRouter()
const bookings = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const categoryLabels = {
  yoga: 'Yoga',
  ayurveda: 'Ayurveda',
  lounge: 'Kombucha Tea Lounge',
}

const statusLabels = {
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
}

function fullName(user) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ')
}

async function loadBookings() {
  if (!auth.hasValidSession()) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    bookings.value = await getAllBookings(auth.accessToken)
  } catch (error) {
    if (error.response?.status === 401) {
      auth.logout()
      return
    }
    if (error.response?.status === 403) {
      await router.replace({ name: 'dashboard' })
      return
    }
    errorMessage.value = 'We could not load the reservations. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadBookings)
</script>

<template>
  <main class="admin-reservations" aria-labelledby="admin-reservations-title">
    <header class="admin-reservations__header">
      <div>
        <RouterLink class="admin-reservations__back" :to="{ name: 'admin' }">← Admin dashboard</RouterLink>
        <h1 id="admin-reservations-title" class="admin-reservations__title">All reservations</h1>
        <p class="admin-reservations__subtitle">Every booking made by sanctuary members.</p>
      </div>
    </header>

    <p v-if="isLoading" class="admin-reservations__muted" role="status">Loading reservations...</p>

    <div v-else-if="errorMessage" class="admin-reservations__box" role="alert">
      <p>{{ errorMessage }}</p>
      <button class="admin-reservations__button" type="button" @click="loadBookings">Try again</button>
    </div>

    <p v-else-if="bookings.length === 0" class="admin-reservations__box">There are no reservations yet.</p>

    <template v-else>
      <p class="admin-reservations__muted" role="status">
        {{ bookings.length }} {{ bookings.length === 1 ? 'reservation' : 'reservations' }}
      </p>

      <div class="admin-reservations__table-wrapper" tabindex="0" aria-label="Reservations table, scroll sideways">
        <table class="admin-reservations__table">
          <thead>
            <tr>
              <th scope="col">Member</th>
              <th scope="col">Session</th>
              <th scope="col">Date &amp; time</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>
                <span class="admin-reservations__strong">{{ fullName(booking.user) }}</span>
                <span class="admin-reservations__small">{{ booking.user.email }}</span>
                <span v-if="booking.user.phoneNumber" class="admin-reservations__small">
                  {{ booking.user.phoneNumber }}
                </span>
              </td>
              <td>
                <span class="admin-reservations__strong">{{ booking.session.title }}</span>
                <span class="admin-reservations__small">{{ categoryLabels[booking.session.category] }}</span>
              </td>
              <td>
                <time :datetime="booking.session.date">{{ booking.session.date }}</time>
                <span class="admin-reservations__small">
                  {{ booking.session.startTime }} – {{ booking.session.endTime }}
                </span>
              </td>
              <td>{{ booking.session.location }}</td>
              <td>
                <span
                  class="admin-reservations__status"
                  :class="`admin-reservations__status--${booking.status.toLowerCase()}`"
                >
                  {{ statusLabels[booking.status] ?? booking.status }}
                </span>
              </td>
              <td class="admin-reservations__notes">
                <template v-if="booking.notes">{{ booking.notes }}</template>
                <span v-else class="admin-reservations__small">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </main>
</template>

<style scoped>
.admin-reservations {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: 1200px;
  min-height: 40vh;
  margin: 5rem auto;
}

.admin-reservations__header {
  margin-bottom: 1.5rem;
}

.admin-reservations__back {
  color: #00664f;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.admin-reservations__title {
  margin: 0.5rem 0 0.25rem;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.admin-reservations__subtitle,
.admin-reservations__muted {
  margin: 0 0 1rem;
  color: var(--color-text-secondary);
}

.admin-reservations__box {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.admin-reservations__button {
  min-height: 2.75rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: 700;
  cursor: pointer;
}

.admin-reservations__table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.admin-reservations__table {
  width: 100%;
  min-width: 860px;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.admin-reservations__table th,
.admin-reservations__table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.admin-reservations__table th {
  background-color: #fafaf9;
  color: #78716c;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.admin-reservations__table tbody tr:last-child td {
  border-bottom: 0;
}

.admin-reservations__strong {
  display: block;
  color: var(--color-heading);
  font-weight: 700;
}

.admin-reservations__small {
  display: block;
  color: #78716c;
  font-size: 0.8rem;
}

.admin-reservations__notes {
  max-width: 260px;
  color: var(--color-text-secondary);
  font-style: italic;
  overflow-wrap: anywhere;
}

.admin-reservations__status {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border: 1px solid currentColor;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.admin-reservations__status--confirmed {
  color: #00664f;
  background-color: #ecfdf5;
}

.admin-reservations__status--cancelled {
  border-color: #fbcfe8;
  color: #be185d;
  background-color: #fff1f2;
}

.admin-reservations__back:focus-visible,
.admin-reservations__button:focus-visible,
.admin-reservations__table-wrapper:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .admin-reservations {
    margin: 2.5rem auto;
  }

  .admin-reservations__title {
    font-size: 1.6rem;
  }
}
</style>
