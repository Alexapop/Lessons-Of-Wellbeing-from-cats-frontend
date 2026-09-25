<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink class="site-logo" to="/" aria-label="Lessons of Wellbeing from Cats — Home">
    <span class="site-logo__symbol" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 10 4 3l6 3h4l6-3-1 7a8 8 0 1 1-14 0Z" />
        <path d="M8 12h.01M16 12h.01M11 16h2" />
      </svg>
    </span>

    <span class="site-logo__text">
      <span class="site-logo__name"> Lessons of Wellbeing from Cats </span>

      <span class="site-logo__subtitle"> Mia &amp; Thor Sanctuary </span>
    </span>
  </RouterLink>
</template>

<style scoped>
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  max-width: 100%;
  color: #003d30;
  text-decoration: none;
}

.site-logo__symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  color: #ffffff;
  background-color: #00664f;
}

.site-logo__symbol svg {
  width: 1.5rem;
  height: 1.5rem;
}

.site-logo__text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.site-logo__name {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(0.95rem, 1.3vw, 1.25rem);
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
}

.site-logo__subtitle {
  color: #28856e;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.site-logo:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 5px;
  border-radius: 0.25rem;
}
</style>
