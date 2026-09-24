<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import MiaThorSection from '../components/home/MiaThorSection.vue'
import LessonsPreview from '../components/home/Lessons.vue'
</script>

<template>
  <main class="home-sanctuary">
    <HeroSection />
    <MiaThorSection />
    <LessonsPreview />

    <!-- LWC-14: Yoga & Ayurveda section -->
    <!-- LWC-15: Kombucha Lounge section -->
  </main>
</template>

<style scoped>
.home-sanctuary {
  max-width: 1520px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
