<script setup>
import lesson1Image from '../../docs/home-page/lesson1-thor-art-of-the-slow-start.png'
import lesson2Image from '../../docs/home-page/lesson2-mia-morning-ritual.png'
import lesson3Image from '../../docs/home-page/lesson3-mia-freshen-up-for-the-day.png'
import lesson4Image from '../../docs/home-page/lesson4-mia-intuitive-eating.png'
import lesson5Image from '../../docs/home-page/lesson5-thor-mindfulness.jpg'
import lesson6Image from '../../docs/home-page/lesson6-thor-respect-your-limits.png'
import lesson7Image from '../../docs/home-page/lesson7-mia-authenticity.png'
import lesson8Image from '../../docs/home-page/lesson8-thor-curiosity.png'
import lesson9Image from '../../docs/home-page/lesson9-mia_thor_paw_kindness_lesson.jpg'

const lessons = [
  {
    id: 1,
    host: 'Thor',
    title: 'The Art of the Slow Starting',
    text: 'Wake up slowly. Don’t rush into your to-do list. Take a moment to connect with the new day before the rush of the world begins.',
    image: lesson1Image,
    imageAlt: 'Thor illustrating the art of starting the day slowly',
  },
  {
    id: 2,
    host: 'Mia',
    title: 'The Morning Ritual',
    text: 'When you get out of bed, stretch! You’ve been lying down for hours, and your body needs to wake up.',
    image: lesson2Image,
    imageAlt: 'Mia illustrating a morning stretching ritual',
  },
  {
    id: 3,
    host: 'Mia',
    title: 'Freshen Up for the Day',
    text: "Prepare yourself for what's ahead. It is essential to refresh your body and mind so you feel ready to face anything with confidence.",
    image: lesson3Image,
    imageAlt: 'Mia illustrating getting ready for the day',
  },
  {
    id: 4,
    host: 'Mia',
    title: 'Intuitive Eating',
    text: 'Eat when you are hungry and listen to what your body truly needs. Avoid overeating; nourish yourself to keep your energy high.',
    image: lesson4Image,
    imageAlt: 'Mia illustrating intuitive eating',
  },
  {
    id: 5,
    host: 'Thor',
    title: 'Mindful Presence',
    text: 'Open your senses to the world around you. There is so much beauty around you—take a moment to simply observe it without judgment.',
    image: lesson5Image,
    imageAlt: 'Thor illustrating mindful presence',
  },
  {
    id: 6,
    host: 'Thor',
    title: 'Respect Your Limits',
    text: 'Rest when you are tired. Don’t push your body to its breaking point. Learn to stop and recharge',
    emphasis: 'before',
    ending: 'you run out of fuel.',
    image: lesson6Image,
    imageAlt: 'Thor illustrating taking time to rest',
  },
  {
    id: 7,
    host: 'Mia',
    title: 'Authenticity',
    text: 'Don’t lie to yourself about how you feel or who you are just to be accepted by others. Be real, just like cats.',
    image: lesson7Image,
    imageAlt: 'Mia illustrating authenticity',
  },
  {
    id: 8,
    host: 'Thor',
    title: 'Curiosity',
    text: 'Stay curious like a cat to keep your mind sharp and your life full of adventure.',
    image: lesson8Image,
    imageAlt: 'Thor illustrating curiosity',
  },
  {
    id: 9,
    host: 'Both',
    title: 'The Gentle Paw Tap of Present Kindness',
    text: 'When Mia or Thor softly tap your hand or press their forehead against you, they teach us that simple, present-moment kindness dissolves loneliness and tension.',
    image: lesson9Image,
    imageAlt: 'Mia and Thor gently touching paws in the sunlit sanctuary',
  },
]
</script>

<template>
  <section id="lessons" class="lessons" aria-labelledby="lessons-title">
    <header class="lessons__intro">
      <p class="lessons__eyebrow">
        <svg
          class="lessons__icon"
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

        Feline Wisdom Principles
      </p>

      <h2 id="lessons-title" class="lessons__title">
        {{ lessons.length }} Lessons of Wellbeing from Cats
      </h2>

      <div class="lessons__introduction">
        <p>
          Ancient self-care rituals reimagined through feline behavior. Explore restorative rest,
          playful movement, and boundary mastery.
        </p>

        <p>
          Who says you need a human model to find balance? Cats have already mastered the art of
          living well. If you pay attention to their rhythms — their rest, their play, their
          effortless presence — you’ll uncover the secret to a calmer, happier, stress-free life.
        </p>

        <p>
          Don’t have a pet at home? Don’t worry. Our expert teachers, Mia and Thor, are here to
          guide you through your first steps toward a life with fewer worries — one purr, stretch,
          and mindful sip at a time.
        </p>
      </div>
    </header>

    <div class="lessons__grid">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
        :aria-labelledby="`lesson-title-${lesson.id}`"
      >
        <header class="lesson-card__header">
          <div>
            <p class="lesson-card__host">Host: {{ lesson.host }}</p>

            <p class="lesson-card__number">Lesson {{ lesson.id }}</p>
          </div>
        </header>

        <h3 :id="`lesson-title-${lesson.id}`" class="lesson-card__title">
          {{ lesson.title }}
        </h3>

        <div class="lesson-card__image-frame">
          <img
            class="lesson-card__image"
            :src="lesson.image"
            :alt="lesson.imageAlt"
            loading="lazy"
          />
        </div>

        <div class="lesson-card__content">
          <p>
            {{ lesson.text }}
            <template v-if="lesson.emphasis">
              <em>{{ lesson.emphasis }}</em>
              {{ lesson.ending }}
            </template>
          </p>
        </div>

        <footer class="lesson-card__footer">
          <!-- LWC-16: Connect to the calendar with relevant filters. -->
          <button class="lesson-card__practice" type="button" disabled>
            Practice in Class
            <span aria-hidden="true">&rarr;</span>
          </button>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.lessons {
  margin-top: 2.5rem;
  padding: 1.5rem 0;
  background-color: #fcfbf8;
}

.lessons__eyebrow {
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

.lessons__eyebrow .lessons__icon {
  color: #292524;
}

.lessons__icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

.lessons__title {
  margin: 0;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: var(--section-title-size);
  line-height: 1.2;
}

.lessons__introduction {
  margin-top: 1rem;
  color: #57534e;
  font-size: var(--section-text-size);
  font-weight: 400;
  line-height: 1.65;
}

.lessons__introduction p {
  margin: 0 0 0.75rem;
}

.lessons__introduction p:last-child {
  margin-bottom: 0;
}

.lessons__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem 0;
  margin-top: 1.5rem;
  background-color: #fcfbf8;
}

.lesson-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1rem;
  border: 1px solid #e5e3e1;
  background-color: #ffffff;
}

.lesson-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid #e5e3e1;
}

.lesson-card__host {
  margin: 0;
  color: #292524;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lesson-card__number {
  margin: 0.25rem 0 0;
  color: #78716c;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.lesson-card__title {
  margin: 0.75rem 0;
  min-height: 2.5em;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.2rem;
  line-height: 1.25;
}

.lesson-card__image-frame {
  height: 240px;
  overflow: hidden;
  border: 1px solid #e5e3e1;
  background-color: #fafaf9;
}

.lesson-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lesson-card__content {
  padding: 0.75rem 0;
  color: #57534e;
  font-size: 0.95rem;
  line-height: 1.7;
}

.lesson-card__content p {
  margin: 0;
}

.lesson-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #f0eeec;
}

.lesson-card__practice {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.5rem 0;
  border: 0;
  color: #292524;
  background-color: transparent;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.lesson-card__practice:disabled {
  cursor: not-allowed;
}

@media (max-width: 1000px) {
  .lessons__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .lessons__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .lessons {
    margin-top: 2rem;
    padding: 1.5rem 0;
  }
}
</style>
