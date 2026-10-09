<script setup>
import ClassCalendarHero from '../components/calendar/ClassCalendarHero.vue'
import ClassCalendarSection from '@/components/calendar/ClassCalendarSection.vue'
</script>

<template>
  <main class="class-calendar page-container" aria-label="Class Calendar">
    <ClassCalendarHero />
    <ClassCalendarSection />
  </main>
</template>

<style scoped>
.class-calendar {
  min-height: 60vh;
}
</style>
