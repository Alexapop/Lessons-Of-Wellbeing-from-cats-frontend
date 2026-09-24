<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import MiaThorSection from '../components/home/MiaThorSection.vue'
import LessonsPreview from '../components/home/Lessons.vue'
import YogaAyurvedaSection from '@/components/home/YogaAyurvedaSection.vue'
import KombuchaTeaLoungeSection from '@/components/home/KombuchaTeaLoungeSection.vue'
</script>

<template>
  <main class="home-sanctuary">
    <HeroSection />
    <MiaThorSection />
    <LessonsPreview />
    <YogaAyurvedaSection />
    <KombuchaTeaLoungeSection />
  </main>
</template>

<style scoped>
.home-sanctuary {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 2rem 0;
}
</style>
