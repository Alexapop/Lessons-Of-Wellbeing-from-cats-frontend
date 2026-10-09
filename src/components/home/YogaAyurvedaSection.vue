<script setup>
const pillars = [
  {
    id: 'postures',
    title: 'Cat Postures (Asanas)',
    description: 'Explore gentle, cat-inspired stretches and mindful movement at your own pace.',
  },
  {
    id: 'doshas',
    title: 'Ayurvedic Doshas',
    description:
      "Discover traditional mind-body balance through Mia's calm and Thor's playful energy.",
  },
  {
    id: 'purr',
    title: 'Purr Resonance',
    description: 'Enjoy a quiet moment of breathing and presence alongside our feline companions.',
  },
]
</script>

<template>
  <section id="yoga-ayurveda" class="yoga" aria-labelledby="yoga-title">
    <div class="yoga__content">
      <p class="yoga__eyebrow">
        <svg
          class="yoga__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3
               12l6.5-2.5L12 3ZM20 2v4m-2-2h4"
          />
        </svg>

        Harmonizing Body &amp; Spirit
      </p>

      <h2 id="yoga-title" class="yoga__title">
        Yoga &amp; Ayurveda Guided by Cat Wisdom
        <span>&amp; Mind-Body Dosha Balance</span>
      </h2>

      <p class="yoga__description">
        In Ayurvedic tradition, wellbeing is explored through the balance of your Dosha (mind-body
        constitution). Cats inspire us to find our own rhythm of rest, movement, and nourishment.
        Join our guided sessions alongside Mia and Thor, our resident feline masters.
      </p>

      <!-- LWC-16: Connect to the calendar filtered by Yoga & Ayurveda. -->
      <button class="yoga__button" type="button" disabled>
        <svg
          class="yoga__icon"
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

        <span>Reserve Yoga &amp; Ayurveda Class</span>

        <svg
          class="yoga__icon"
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
      </button>
    </div>

    <div class="yoga__pillars">
      <h3 class="yoga__pillars-title">Practice Pillars:</h3>

      <ul class="yoga__list">
        <li v-for="pillar in pillars" :key="pillar.id" class="yoga__pillar">
          <svg
            class="yoga__icon"
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
            <strong>{{ pillar.title }}:</strong>
            {{ pillar.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.yoga {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: center;
  gap: 3rem;
  margin-top: 2.5rem;
  padding: 3.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.yoga__content {
  min-width: 0;
}

.yoga__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.25rem;
  color: #78716c;
  font-size: var(--eyebrow-size);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.yoga__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}

.yoga__eyebrow .yoga__icon {
  color: var(--color-text);
}

.yoga__title {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--section-title-size);
  font-weight: 700;
  line-height: 1.2;
}

.yoga__title span {
  display: block;
  margin-top: 0.35rem;
  color: var(--color-text-secondary);
  font-style: italic;
  font-weight: 400;
}

.yoga__description {
  margin: 1.75rem 0 0;
  color: var(--color-text-secondary);
  font-size: var(--section-text-size);
  line-height: 1.65;
}

.yoga__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  max-width: 100%;
  min-height: 3.25rem;
  margin-top: 1.75rem;
  padding: 0.875rem 1.5rem;
  border: 1px solid #292524;
  border-radius: 0;
  color: #ffffff;
  background-color: var(--color-text);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
}

.yoga__button:disabled {
  cursor: not-allowed;
}

.yoga__pillars {
  min-width: 0;
  padding: 1.75rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
}

.yoga__pillars-title {
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

.yoga__list {
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.yoga__pillar {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.yoga__pillar .yoga__icon {
  margin-top: 0.1rem;
  color: var(--color-text);
}

.yoga__pillar p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.yoga__pillar strong {
  font-weight: 700;
}

@media (max-width: 1000px) {
  .yoga {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .yoga {
    margin-top: 2rem;
    padding: 1.25rem;
  }

  .yoga__pillars {
    padding: 1.25rem;
  }

  .yoga__button {
    width: 100%;
    padding: 0.875rem 1rem;
  }
}
</style>
