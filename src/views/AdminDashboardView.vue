<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getAdminDashboard } from '@/services/adminService.js'

const auth = useAuthStore()
const router = useRouter()
const summary = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const stats = [
  { key: 'totalSessions', label: 'Sessions' },
  { key: 'upcomingSessions', label: 'Upcoming sessions' },
  { key: 'confirmedReservations', label: 'Confirmed reservations' },
  { key: 'cancelledReservations', label: 'Cancelled reservations' },
  { key: 'registeredUsers', label: 'Registered users' },
]

async function loadSummary() {
  if (!auth.hasValidSession()) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    summary.value = await getAdminDashboard(auth.accessToken)
  } catch (error) {
    if (error.response?.status === 401) {
      auth.logout()
      return
    }
    if (error.response?.status === 403) {
      await router.replace({ name: 'dashboard' })
      return
    }
    errorMessage.value = 'We could not load the admin overview. Please try again.'
  } finally {
    isLoading.value = false
  }
}

async function logout() {
  await router.replace({ name: 'home' })
  auth.logout()
}

onMounted(loadSummary)
</script>

<template>
  <main class="admin" aria-labelledby="admin-title">
    <header class="admin__header">
      <div>
        <p class="admin__eyebrow">Sanctuary administration</p>
        <h1 id="admin-title" class="admin__title">Admin dashboard</h1>
        <p class="admin__welcome">Welcome, {{ auth.fullName }}. Manage sessions and reservations.</p>
      </div>

      <button class="admin__secondary" type="button" @click="logout">Logout</button>
    </header>

    <p v-if="isLoading" class="admin__muted" role="status">Loading overview...</p>

    <div v-else-if="errorMessage" class="admin__error" role="alert">
      <p>{{ errorMessage }}</p>
      <button class="admin__secondary" type="button" @click="loadSummary">Try again</button>
    </div>

    <dl v-else-if="summary" class="admin__stats" aria-label="Sanctuary overview">
      <div v-for="stat in stats" :key="stat.key" class="admin__stat">
        <dt>{{ stat.label }}</dt>
        <dd>{{ summary[stat.key] }}</dd>
      </div>
    </dl>

    <div class="admin__actions">
      <RouterLink class="admin__primary" :to="{ name: 'admin-reservations' }">
        View all reservations
      </RouterLink>
      <RouterLink class="admin__secondary" :to="{ name: 'class-calendar' }">View class calendar</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.admin {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: 1200px;
  min-height: 40vh;
  margin: 5rem auto;
}

.admin__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.admin__eyebrow {
  margin: 0;
  color: #00664f;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin__title {
  margin: 0.25rem 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.admin__welcome,
.admin__muted {
  margin: 0;
  color: var(--color-text-secondary);
}

.admin__muted {
  margin-top: 2rem;
}

.admin__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.admin__stat {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.admin__stat dt {
  color: #78716c;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.admin__stat dd {
  margin: 0.5rem 0 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.admin__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.admin__error {
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.admin__primary,
.admin__secondary {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.6rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.admin__primary {
  background-color: var(--color-text);
  color: #ffffff;
}

.admin__secondary {
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
}

.admin__primary:focus-visible,
.admin__secondary:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .admin {
    margin: 2.5rem auto;
  }

  .admin__header {
    padding: 1.5rem;
  }
}
</style>
