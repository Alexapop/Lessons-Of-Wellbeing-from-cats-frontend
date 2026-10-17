<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ClassCalendarHero from '../components/calendar/ClassCalendarHero.vue'
import ClassCalendarSection from '@/components/calendar/ClassCalendarSection.vue'

const auth = useAuthStore()
</script>

<template>
  <main class="class-calendar page-container" aria-label="Class Calendar">
    <!-- Admins reach the calendar from the admin dashboard, so they get the same way back. -->
    <RouterLink v-if="auth.isAdmin" class="class-calendar__back" :to="{ name: 'admin' }">
      ← Admin dashboard
    </RouterLink>
    <ClassCalendarHero />
    <ClassCalendarSection />
  </main>
</template>

<style scoped>
.class-calendar {
  min-height: 60vh;
}

.class-calendar__back {
  display: inline-block;
  margin-top: 2rem;
  color: #00664f;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.class-calendar__back:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}
</style>
