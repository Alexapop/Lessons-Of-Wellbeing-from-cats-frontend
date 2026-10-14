<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const errorMessage = ref('')

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

onMounted(loadProfile)
</script>

<template>
  <main class="dashboard">
    <h1>Your dashboard</h1>
    <p>Welcome, {{ auth.fullName }}.</p>
    <p v-if="auth.user">{{ auth.user.email }}</p>
    <div v-if="errorMessage" role="alert">
      <p>{{ errorMessage }}</p>
      <button type="button" @click="loadProfile">Try again</button>
    </div>
    <RouterLink to="/class-calendar">Explore the class calendar</RouterLink>
  </main>
</template>

<style scoped>
.dashboard {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: var(--page-width);
  margin: 3rem auto;
  min-height: 40vh;
}
h1 {
  font-family: var(--font-heading);
  color: var(--color-heading);
}
a {
  display: inline-block;
  margin-top: 1rem;
  color: var(--color-heading);
}
</style>
