<script setup>
import { useRoute } from 'vue-router'
import ReservationForm from '@/components/booking/ReservationForm.vue'

const route = useRoute()
</script>

<template>
  <main class="reservation-view page-container" aria-label="Reservation">
    <ReservationForm :session-id="route.params.id" />
  </main>
</template>

<style scoped>
.reservation-view {
  min-height: 60vh;
  padding-block: 3rem;
}
</style>
