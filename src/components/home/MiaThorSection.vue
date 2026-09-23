<script setup>
import miaImage from '../../docs/home-page/i-am-mia.png'
import thorImage from '../../docs/home-page/i-am-thor.png'

const cats = [
  {
    id: 'mia',
    name: 'Mia',
    image: miaImage,
    imageAlt: 'Mia, a tabby cat sitting calmly in the sanctuary',
    heading: 'The Sovereign Queen of the House',
    role: 'Queen of the House',
    subtitle: 'Master of Boundaries, Deep Relaxation & Royal Calm',
    description:
      'Mia is a beautiful European tiger tabby cat who observes the universe with quiet dignity. As Queen of the House, she teaches humans how to embody innate self-worth, claim restful space without feeling guilty, and cultivate inner peace through mindful stillness.',
    traits: ['Regal', 'Calm', 'Discerning', 'Boundaried'],
    tea: "Queen Mia's Royal Chamomile & Lavender Elixir",
  },
  {
    id: 'thor',
    name: 'Thor',
    image: thorImage,
    imageAlt: 'Thor, a ginger cat jumping to play with a feather toy',
    heading: 'The Joyful Adventurer & Playful Spirit',
    role: 'The Kinetic Spirit',
    subtitle: 'Master of Morning Stretches, Spontaneity & Vibrant Energy',
    description:
      'Thor is a cheerful, affectionate ginger cat who approaches every moment as a brand new adventure. He teaches us that flexibility starts with playful curiosity, stretching is a daily joy, and laughter is the ultimate Ayurvedic remedy for tension.',
    traits: ['Playful', 'Curious', 'Energetic', 'Affectionate'],
    tea: 'Thor’s Zingy Ginger-Citrus Spark Kombucha',
  },
]
</script>

<template>
  <section class="spotlight" aria-labelledby="spotlight-title">
    <header class="spotlight__intro">
      <p class="spotlight__eyebrow">
        <svg
          class="icon"
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

        Character Spotlight
      </p>

      <h2 id="spotlight-title" class="spotlight__title">The Queen &amp; The Kinetic Spirit</h2>

      <p class="spotlight__description">
        Every lesson of wellbeing in our sanctuary is inspired by the natural behavior, boundaries,
        and joyful rhythms of Mia and Thor.
      </p>
    </header>

    <div class="spotlight__cards">
      <article
        v-for="cat in cats"
        :key="cat.id"
        class="cat-card"
        :aria-labelledby="`${cat.id}-title`"
      >
        <header class="cat-card__header">
          <p class="cat-card__heading">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path v-if="cat.id === 'mia'" d="m3 6 4 4 5-7 5 7 4-4-3 12H6L3 6Zm4 15h10" />
              <path
                v-else
                d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3
                   12l6.5-2.5L12 3ZM20 2v4m-2-2h4"
              />
            </svg>

            {{ cat.heading }}
          </p>

          <span class="cat-card__role">{{ cat.role }}</span>
        </header>

        <div class="cat-card__body">
          <div class="cat-card__image-frame">
            <img class="cat-card__image" :src="cat.image" :alt="cat.imageAlt" loading="lazy" />
          </div>

          <div class="cat-card__details">
            <h3 :id="`${cat.id}-title`" class="cat-card__name">
              {{ cat.name }}
            </h3>

            <p class="cat-card__subtitle">{{ cat.subtitle }}</p>

            <p class="cat-card__description">{{ cat.description }}</p>

            <ul class="cat-card__traits" aria-label="Personality traits">
              <li v-for="trait in cat.traits" :key="trait">
                {{ trait }}
              </li>
            </ul>
          </div>
        </div>

        <footer class="cat-card__footer">
          <p class="cat-card__tea">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
              <path d="M16 9h2a3 3 0 0 1 0 6h-2M6 3v2m4-2v2m4-2v2" />
            </svg>

            <span>
              Signature Tea:
              <strong>{{ cat.tea }}</strong>
            </span>
          </p>

          <!-- LWC-16: Connect to the calendar filtered by host. -->
          <button class="cat-card__button" type="button" disabled>
            <svg
              class="icon"
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

            Reserve class with {{ cat.name }}
          </button>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.spotlight {
  margin-top: 4rem;
  padding: 3rem 0;
  background-color: #fcfbf8;
}

.spotlight__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.5rem;
  color: #a8a29e;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

.spotlight__eyebrow .icon {
  color: #292524;
}

.spotlight__title {
  margin: 0;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2rem, 3vw, 2.75rem);
  line-height: 1.2;
}

.spotlight__description {
  margin: 1rem 0 0;
  color: #57534e;
  font-size: 1.125rem;
}

.spotlight__cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 3.5rem;
  border: 1px solid #e5e3e1;
  background-color: #ffffff;
}

.cat-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 2.75rem;
}

.cat-card + .cat-card {
  border-left: 1px solid #e5e3e1;
}

.cat-card__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0eeec;
}

.cat-card__heading {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  color: #1c1917;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cat-card__role {
  color: #a8a29e;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cat-card__body {
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: start;
  gap: 1.75rem;
  padding: 1.75rem 0 2.25rem;
}

.cat-card__image-frame {
  padding: 0.3rem;
  border: 1px solid #e5e3e1;
  background-color: #fafaf9;
}

.cat-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.cat-card__details {
  min-width: 0;
}

.cat-card__name {
  margin: 0;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.25rem;
  line-height: 1.15;
}

.cat-card__subtitle {
  margin: 0.35rem 0 1rem;
  color: #78716c;
  font-size: 0.8rem;
  font-style: italic;
  line-height: 1.5;
}

.cat-card__description {
  margin: 0;
  color: #57534e;
  font-size: 0.95rem;
  line-height: 1.7;
}

.cat-card__traits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.cat-card__traits li {
  padding: 0.15rem 0.55rem;
  border: 1px solid #e5e3e1;
  color: #292524;
  background-color: #f5f5f4;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cat-card__footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0eeec;
}

.cat-card__tea {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin: 0 0 0.875rem;
  color: #78716c;
  font-size: 0.8rem;
}

.cat-card__tea .icon {
  margin-top: 0.15rem;
}

.cat-card__tea strong {
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.9rem;
}

.cat-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 1.25rem;
  border: 1px solid #292524;
  border-radius: 0;
  color: #ffffff;
  background-color: #292524;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cat-card__button:disabled {
  cursor: not-allowed;
}

@media (max-width: 1100px) {
  .spotlight__cards {
    grid-template-columns: 1fr;
  }

  .cat-card + .cat-card {
    border-top: 1px solid #e5e3e1;
    border-left: 0;
  }
}

@media (max-width: 600px) {
  .spotlight {
    margin-top: 2rem;
    padding: 2rem 0;
  }

  .cat-card {
    padding: 1.25rem;
  }

  .cat-card__body {
    grid-template-columns: 1fr;
  }

  .cat-card__button {
    width: 100%;
  }
}
</style>
