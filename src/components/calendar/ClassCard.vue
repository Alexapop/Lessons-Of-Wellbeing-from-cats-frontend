<script setup>
import { ref } from 'vue'

defineProps({
  classItem: {
    type: Object,
    required: true,
  },
})

const isExpanded = ref(false)

const categoryLabels = {
  yoga: 'Yoga',
  ayurveda: 'Ayurveda',
  lounge: 'Kombucha Tea Lounge',
}

const hostLabels = {
  mia: 'Mia',
  thor: 'Thor',
  both: 'Mia & Thor',
}

function toggleDetails() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <article class="class-card">
    <div class="class-card__meta">
      <span class="class-card__category">
        {{ categoryLabels[classItem.category] }}
      </span>

      <span class="class-card__host">Host&nbsp;: {{ hostLabels[classItem.host] }}</span>
    </div>

    <h2 class="class-card__title">
      <button
        :id="`title-${classItem.id}`"
        class="class-card__toggle"
        type="button"
        :aria-expanded="isExpanded"
        :aria-controls="`details-${classItem.id}`"
        @click="toggleDetails"
      >
        <span>{{ classItem.title }}</span>

        <span class="class-card__indicator" aria-hidden="true">
          {{ isExpanded ? '−' : '+' }}
        </span>
      </button>
    </h2>

    <p class="class-card__level">Level: {{ classItem.level }}</p>

    <div
      v-show="isExpanded"
      :id="`details-${classItem.id}`"
      class="class-card__details"
      role="region"
      :aria-labelledby="`title-${classItem.id}`"
    >
      <dl class="class-card__information">
        <div>
          <dt>Date</dt>
          <dd>
            <time :datetime="classItem.date">
              {{ classItem.date }}
            </time>
          </dd>
        </div>

        <div>
          <dt>Time</dt>
          <dd>
            {{ classItem.startTime }} – {{ classItem.endTime }} ({{ classItem.duration }} mins)
          </dd>
        </div>

        <div>
          <dt>Location</dt>
          <dd>{{ classItem.location }}</dd>
        </div>

        <div>
          <dt>Guide</dt>
          <dd>{{ classItem.guide }}</dd>
        </div>
      </dl>

      <p class="class-card__description">
        {{ classItem.description }}
      </p>

      <div v-if="classItem.drinks.length > 0" class="class-card__drinks">
        <h3>Available teas &amp; kombuchas</h3>

        <ul>
          <li v-for="drink in classItem.drinks" :key="drink">
            {{ drink }}
          </li>
        </ul>
      </div>

      <div v-if="classItem.focus.length > 0" class="class-card__focus">
        <h3>Key focus</h3>

        <ul>
          <li v-for="focus in classItem.focus" :key="focus">
            {{ focus }}
          </li>
        </ul>
      </div>

      <div class="class-card__booking">
        <button
          class="class-card__reserve"
          type="button"
          disabled
          :aria-describedby="`booking-note-${classItem.id}`"
        >
          Login to reserve
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.class-card {
  min-width: 0;
  padding: var(--hero-padding);
  background-color: var(--color-background);
  box-shadow: 0 0 0 1px var(--color-border);
  overflow-wrap: anywhere;
}

.class-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.class-card__category {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.class-card__host {
  margin-left: auto;
  color: #78716c;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-transform: uppercase;
}

.class-card__title {
  margin: 1rem 0 0.5rem;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  line-height: 1.3;
}

.class-card__toggle {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.class-card__toggle:hover {
  color: #00664f;
}

.class-card__indicator {
  flex-shrink: 0;
  font-family: var(--font-body);
}

.class-card__level {
  margin: 0;
  color: #78716c;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.class-card__details {
  margin-top: 1.25rem;
}

.class-card__information {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
  font-size: 0.875rem;
}

.class-card__information dt {
  color: var(--color-heading);
  font-weight: 700;
}

.class-card__information dd {
  margin: 0;
  color: var(--color-text-secondary);
}

.class-card__description {
  margin: 1.25rem 0;
  color: var(--color-text-secondary);
  font-size: var(--section-text-size);
}

.class-card__drinks {
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid #fcd34d;
  background-color: #fffbeb;
  color: #92400e;
}

.class-card__drinks h3,
.class-card__focus h3 {
  margin: 0 0 0.75rem;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.class-card__drinks ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.875rem;
}

.class-card__focus ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.class-card__focus li {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
}

.class-card__booking {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.class-card__booking > span,
.class-card__booking-note {
  color: #78716c;
  font-size: 0.75rem;
}

.class-card__reserve:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.class-card__booking-note {
  margin: 0.5rem 0 0;
}

.class-card__reserve {
  max-width: 100%;
  min-height: 2.75rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0;
  color: var(--color-text);
  background-color: var(--color-background);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.class-card__toggle:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 4px;
}

@media (max-width: 700px) {
  .class-card {
    padding: 1.25rem;
  }
}
</style>
