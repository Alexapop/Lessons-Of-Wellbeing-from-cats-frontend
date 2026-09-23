<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
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
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid #e5e3e1;
  background-color: #ffffff;
}

.site-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1520px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.site-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  color: #292524;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__link.router-link-exact-active {
  border-bottom-color: #292524;
}

.site-nav__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}
</style>
