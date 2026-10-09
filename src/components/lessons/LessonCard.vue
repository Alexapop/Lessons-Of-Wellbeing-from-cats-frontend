<script setup>
import { ref } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
})

const isOpen = ref(false)
const detailsId = `lesson-details-${props.lesson.id}`

function toggleDetails() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <article class="lesson-card" :aria-labelledby="`lesson-title-${lesson.id}`">
    <header class="lesson-card__header">
      <p class="lesson-card__number">Lesson {{ lesson.id }}</p>

      <p class="lesson-card__host">Host&nbsp;: {{ lesson.host }}</p>
    </header>

    <h3 :id="`lesson-title-${lesson.id}`" class="lesson-card__title">
      <button
        class="lesson-card__toggle"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="detailsId"
        @click="toggleDetails"
      >
        <span>{{ lesson.title }}</span>

        <svg
          class="lesson-card__chevron"
          :class="{ 'lesson-card__chevron--open': isOpen }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>

    <div class="lesson-card__image-frame">
      <img
        class="lesson-card__image"
        :src="lesson.image"
        :alt="lesson.imageAlt"
        :style="{ objectPosition: lesson.imagePosition }"
        loading="lazy"
      />
    </div>

    <div v-show="isOpen" :id="detailsId" class="lesson-card__details">
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
    </div>
  </article>
</template>

<style scoped>
.lesson-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0.85rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.lesson-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: -0.85rem -0.85rem 0;
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--color-border);
  background-color: #fafaf9;
}

.lesson-card__number {
  margin: 0;
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lesson-card__host {
  margin: 0;
  color: #78716c;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lesson-card__title {
  margin: 0.5rem 0;
  min-height: 2.5em;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  line-height: 1.25;
}

.lesson-card__toggle {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0;
  border: 0;
  color: inherit;
  background-color: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.lesson-card__toggle:hover {
  color: #00664f;
}

.lesson-card__toggle:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.lesson-card__chevron {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
  color: #00664f;
  transition: transform 0.2s ease;
}

.lesson-card__chevron--open {
  transform: rotate(180deg);
}

.lesson-card__image-frame {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.lesson-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lesson-card__content {
  padding: 0.5rem 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.55;
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
  margin: 0 -0.85rem -0.85rem;
  padding: 0.15rem 0.85rem;
  border-top: 1px solid var(--color-border);
  background-color: #fafaf9;
}

.lesson-card__practice {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: 0;
  color: #00664f;
  line-height: 1.4;
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

@media (prefers-reduced-motion: reduce) {
  .lesson-card__chevron {
    transition: none;
  }
}
</style>
