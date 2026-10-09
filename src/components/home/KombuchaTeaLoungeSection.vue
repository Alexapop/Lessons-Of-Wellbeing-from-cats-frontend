<script setup>
import { RouterLink } from 'vue-router'

const etiquette = [
  {
    id: 'mia',
    description: 'Let Queen Mia come to you when she chooses to bestow her presence.',
  },
  {
    id: 'thor',
    description: 'Thor loves feather wands! Feel free to gently play with him.',
  },
  {
    id: 'quiet',
    description: 'Enjoy low voices, relaxed breathing, and organic botanical sips.',
  },
]
</script>

<template>
  <section id="kombucha-tea" class="lounge" aria-labelledby="lounge-title">
    <div class="lounge__content">
      <p class="lounge__eyebrow">
        <svg
          class="lounge__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8 4 3l5 3a10 10 0 0 1 6 0l5-3-1 5a7 7 0 1 1-14 0Z" />
          <path d="M9 12h.01M15 12h.01M11 16h2" />
        </svg>

        The Garden Tea &amp; Kombucha Lounge
      </p>

      <h2 id="lounge-title" class="lounge__title">
        Come in for a Kombucha Drink or Tea
        <span>&amp; Meet Our Feline Gurus!</span>
      </h2>

      <p class="lounge__description">
        Our lounge is designed as a sanctuary of quiet presence. Sip freshly brewed probiotic
        kombuchas or soothing Ayurvedic herbal infusions, and hang out with
        <strong>Mia</strong> and <strong> Thor</strong>.
      </p>

      <RouterLink
        class="lounge__button"
        :to="{ name: 'class-calendar', query: { category: 'lounge' } }"
      >
        <svg
          class="lounge__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M4 11h16" />
        </svg>

        <span>Reserve Kombucha & Tea Lounge Visit</span>

        <svg
          class="lounge__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </RouterLink>
    </div>

    <div class="lounge__etiquette">
      <h3 class="lounge__etiquette-title">Cat Sanctuary Etiquette:</h3>

      <ul class="lounge__list">
        <li v-for="rule in etiquette" :key="rule.id" class="lounge__rule">
          <svg
            class="lounge__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>

          <p>
            {{ rule.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.lounge {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.lounge__content {
  min-width: 0;
}

.lounge__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.75rem;
  color: #78716c;
  font-size: var(--eyebrow-size);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.lounge__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}

.lounge__eyebrow .lounge__icon {
  color: var(--color-text);
}

.lounge__title {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--section-title-size);
  font-weight: 700;
  line-height: 1.2;
}

.lounge__title span {
  display: block;
  margin-top: 0.35rem;
  color: var(--color-text-secondary);
  font-style: italic;
  font-weight: 400;
}

.lounge__description {
  margin: 1rem 0 0;
  color: var(--color-text-secondary);
  font-size: var(--section-text-size);
  line-height: 1.65;
}

.lounge__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 100%;
  min-height: 2.25rem;
  margin-top: 1.25rem;
  padding: 0.4rem 1rem;
  border: 1px solid #1f7a5f;
  border-radius: 0;
  color: #ffffff;
  background-color: #1f7a5f;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}

.lounge__button .lounge__icon {
  width: 1rem;
  height: 1rem;
}

.lounge__etiquette {
  min-width: 0;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
}

.lounge__etiquette-title {
  margin: 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--section-text-size);
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
}

.lounge__list {
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.lounge__rule {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.lounge__rule .lounge__icon {
  margin-top: 0.1rem;
  color: var(--color-text);
}

.lounge__rule p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.lounge__description strong {
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-weight: 700;
}

@media (max-width: 1000px) {
  .lounge {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .lounge {
    margin-top: 1.5rem;
    padding: 1.25rem;
  }

  .lounge__etiquette {
    padding: 1.25rem;
  }

  .lounge__button {
    width: 100%;
  }
}
</style>
