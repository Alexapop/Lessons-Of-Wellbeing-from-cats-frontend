<script setup>
import sanctuaryImage from '../../docs/home-page/mia_thor_hero.png'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__content">
      <p class="hero__eyebrow">
        <svg
          class="hero__icon"
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

        Sanctuary of Feline Wisdom
      </p>

      <h1 id="hero-title" class="hero__title">
        Lessons of Wellbeing
        <span>Directly From Cats</span>
      </h1>

      <p class="hero__description">
        Step into a serene sanctuary guided by our feline gurus:
        <strong>Mia</strong>, queen of the house who masters boundaries and royal rest, and
        <strong>Thor</strong>, kinetic spirit of joyful movement. Reconnect through Yoga, Ayurveda
        routines, and organic Kombucha &amp; Tea lounge visits.
      </p>

      <div class="hero__wisdom">
        <p class="hero__quote-intro">As Mia and Thor always say:</p>

        <blockquote class="hero__quote">
          “In a world full of hurry, be the cat that stops to sit in the sun”
        </blockquote>
      </div>

      <!-- LWC-16: Connect these actions to Calendar and Lessons. -->
      <div class="hero__actions">
        <button class="hero__button hero__button--primary" type="button" disabled>
          <svg
            class="hero__icon"
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

          Reserve class or visit
          <span aria-hidden="true">›</span>
        </button>

        <button class="hero__button hero__button--secondary" type="button" disabled>
          <svg
            class="hero__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5
                 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
            />
          </svg>

          Read wellbeing lessons
        </button>
      </div>

      <dl class="hero__highlights">
        <div class="hero__highlight">
          <dt>Gurus</dt>
          <dd>Mia &amp; Thor</dd>
        </div>

        <div class="hero__highlight">
          <dt>Self-care</dt>
          <dd>Yoga &amp; Ayurveda</dd>
        </div>

        <div class="hero__highlight">
          <dt>Sip &amp; rest</dt>
          <dd>Kombucha &amp; Tea</dd>
        </div>
      </dl>
    </div>

    <div class="hero__visual">
      <figure class="hero__figure">
        <img
          class="hero__image"
          :src="sanctuaryImage"
          alt="Two cats sitting on a rug in a bright sanctuary filled with plants"
          fetchpriority="high"
        />

        <figcaption class="hero__caption">
          <strong>Mia &amp; Thor Sanctuary</strong>
          <span>Guardians of peace &amp; play</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 7fr 5fr;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.hero__content {
  min-width: 0;
  padding: var(--hero-padding);
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.75rem;
  color: #78716c;
  font-size: var(--eyebrow-size);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}

.hero__title {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--hero-title-size);
  font-weight: 700;
  line-height: 1.2;
}

.hero__title span {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-text-secondary);
  font-style: italic;
  font-weight: 400;
}

.hero__description {
  margin: 2rem 0 0;
  color: var(--color-text-secondary);
  font-size: var(--section-text-size);
  line-height: 1.65;
}

.hero__description strong {
  color: var(--color-heading);
  font-family: var(--font-heading);
}

.hero__wisdom {
  max-width: 100%;
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid #b8d8ca;
}

.hero__quote-intro {
  margin: 0 0 0.4rem;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}

.hero__quote {
  margin: 0;
  color: #00664f;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 2.25rem;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 3.25rem;
  padding: 0.875rem 1.5rem;
  border: 1px solid #292524;
  border-radius: 0;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero__button--primary {
  color: #ffffff;
  background-color: var(--color-text);
}

.hero__button--secondary {
  color: var(--color-text);
  background-color: var(--color-background);
}

.hero__button:disabled {
  cursor: not-allowed;
}

.hero__highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 2.25rem 0 0;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
}

.hero__highlight {
  padding: 1rem;
}

.hero__highlight + .hero__highlight {
  border-left: 1px solid var(--color-border);
}

.hero__highlight dt {
  color: #78716c;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero__highlight dd {
  margin: 0.25rem 0 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
}

.hero__visual {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 1.25rem;
  border-left: 1px solid var(--color-border);
  background-color: #f5f5f4;
}

.hero__figure {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: var(--color-background);
}

.hero__image {
  display: block;
  width: 100%;
  aspect-ratio: 1.06;
  object-fit: cover;
}

.hero__caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.875rem;
  padding: 0.875rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
  text-align: center;
}

.hero__caption strong {
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 0.95rem;
}

.hero__caption span {
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  font-style: italic;
}

@media (max-width: 1200px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    padding: 1.25rem;
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }
}

@media (max-width: 480px) {
  .hero__visual {
    padding: 1.25rem;
  }

  .hero__button {
    width: 100%;
  }

  .hero__highlights {
    grid-template-columns: 1fr;
  }

  .hero__highlight + .hero__highlight {
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }
}
</style>
