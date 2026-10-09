<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/layout/Footer.vue'
import Logo from './components/layout/Logo.vue'
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
      </nav>
    </div>
  </header>

  <RouterView />
  <Footer />
</template>

<style scoped>
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
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__link.router-link-exact-active {
  border-bottom-color: var(--color-text);
}

.site-nav__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}
@media (max-width: 600px) {
  .site-header__container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 1rem 0;
  }

  .site-nav__link {
    font-size: 0.75rem;
  }
}
</style>
