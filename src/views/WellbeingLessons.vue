<script setup>
import LessonsPreview from '../components/lessons/Lessons.vue'
</script>

<template>
  <main class="wellbeing-lessons page-container">
    <LessonsPreview />
  </main>
</template>

<style scoped>
.wellbeing-lessons {
  min-height: 60vh;
}

.wellbeing-lessons :deep(.lessons) {
  margin-top: 0;
}
</style>
