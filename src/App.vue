<script setup>
import { watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Footer from './components/layout/Footer.vue'
import Logo from './components/layout/Logo.vue'
const auth = useAuthStore()
const router = useRouter()

watch(() => auth.isAuthenticated, (authenticated) => {
  if (!authenticated && router.currentRoute.value.meta.requiresAuth) {
    router.replace({ name: 'login' })
  }
})

async function logout() {
  await router.replace({ name: 'home' })
  auth.logout()
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__container">
      <Logo />

      <nav class="site-nav" aria-label="Main navigation">
        <RouterLink class="site-nav__link" to="/">
          <svg
            class="site-nav__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 10 4 3l6 3h4l6-3-1 7a8 8 0 1 1-14 0Z" />
            <path d="M8 12h.01M16 12h.01M11 16h2" />
          </svg>

          Home &amp; Sanctuary
        </RouterLink>

        <RouterLink class="site-nav__link" to="/wellbeing-lessons">
          <svg
            class="site-nav__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="5.5" cy="10.5" r="1.8" />
            <circle cx="9.5" cy="5.5" r="1.8" />
            <circle cx="14.5" cy="5.5" r="1.8" />
            <circle cx="18.5" cy="10.5" r="1.8" />
            <path
              d="M12 11.5c-2.8 0-5.5 3.6-5.5 6 0 1.6 1.2 2.5 2.8 2.5
                 1.1 0 1.8-.6 2.7-.6s1.6.6 2.7.6c1.6 0 2.8-.9 2.8-2.5 0-2.4-2.7-6-5.5-6Z"
            />
          </svg>

          Wellbeing Lessons
        </RouterLink>

        <RouterLink class="site-nav__link" to="/class-calendar">
          <svg
            class="site-nav__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 11h18" />
          </svg>

          Class Calendar
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" class="site-nav__link site-nav__login" to="/login">
          <svg
            class="site-nav__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M14 3h6v18h-6M3 12h12M9 6l6 6-6 6" />
          </svg>
          Login
        </RouterLink>
        <template v-else>
          <RouterLink class="site-nav__link" to="/dashboard">{{ auth.fullName }}</RouterLink>
          <button class="site-nav__link site-nav__login logout-button" type="button" @click="logout">
            Logout
          </button>
        </template>
        <RouterLink
          v-if="!auth.isAuthenticated"
          class="site-nav__link site-nav__join"
          :to="{ name: 'register' }"
        >
          <svg
            class="site-nav__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
          </svg>
          Join Sanctuary
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <Footer />
</template>

<style scoped>
.logout-button {
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}
.site-header {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.site-header__container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 2.5rem;
  width: calc(100% - 2 * var(--page-gutter));
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 1.5rem 0;
}

.site-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.site-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  color: var(--color-text);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__link.router-link-exact-active {
  border-bottom-color: var(--color-text);
}

.site-nav__icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
  color: #00664f;
}
.site-nav__login {
  padding: 0.4rem 1.25rem;
  border: 1px solid var(--color-text);
}

.site-nav__login:hover {
  background-color: #f5f5f4;
}

.site-nav__login:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.site-nav__login .site-nav__icon {
  color: currentColor;
}
.site-nav__join {
  padding: 0.4rem 1.25rem;
  border: 1px solid var(--color-text);
  background: var(--color-text);
  color: white;
}

.site-nav__join .site-nav__icon {
  color: currentColor;
}

.site-nav__join:hover {
  background: #44403c;
}

.site-nav__join:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .site-header__container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 1rem 0;
  }

  .site-nav__link {
    font-size: 0.7rem;
  }
}
</style>
