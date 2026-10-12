<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ClassCard from './ClassCard.vue'
import { getUpcomingSessions } from '@/services/sessionService.js'

const categories = [
  { value: 'all', label: 'All' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'ayurveda', label: 'Ayurveda' },
  { value: 'lounge', label: 'Kombucha Tea Lounge' },
]

const hosts = [
  { value: 'all', label: 'All Hosts' },
  { value: 'mia', label: 'Mia' },
  { value: 'thor', label: 'Thor' },
  { value: 'both', label: 'Mia & Thor' },
]

const route = useRoute()

function initialFilter(options, value) {
  return options.some((option) => option.value === value) ? value : 'all'
}

const selectedCategory = ref(initialFilter(categories, route.query.category))
const selectedHost = ref(initialFilter(hosts, route.query.host))

const classes = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadSessions() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    classes.value = await getUpcomingSessions()
  } catch {
    errorMessage.value = 'We could not load the sessions. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadSessions)

const filteredClasses = computed(() => {
  return classes.value.filter((classItem) => {
    const matchesCategory =
      selectedCategory.value === 'all' || classItem.category === selectedCategory.value

    const matchesHost = selectedHost.value === 'all' || classItem.host === selectedHost.value

    return matchesCategory && matchesHost
  })
})

function resetFilters() {
  selectedCategory.value = 'all'
  selectedHost.value = 'all'
}
</script>

<template>
  <section class="class-list" aria-label="Classes and lounge sessions">
    <div class="class-list__filters">
      <div class="class-list__filter-group" role="group" aria-label="Filter by category">
        <span class="class-list__filter-label">Category:</span>

        <button
          v-for="category in categories"
          :key="category.value"
          class="class-list__filter"
          type="button"
          :aria-pressed="selectedCategory === category.value"
          @click="selectedCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="class-list__filter-group" role="group" aria-label="Filter by host">
        <span class="class-list__filter-label">Host&nbsp;:</span>

        <button
          v-for="host in hosts"
          :key="host.value"
          class="class-list__filter"
          type="button"
          :aria-pressed="selectedHost === host.value"
          @click="selectedHost = host.value"
        >
          {{ host.label }}
        </button>
      </div>
    </div>

    <p v-if="isLoading" class="class-list__count" role="status">Loading sessions...</p>

    <div v-else-if="errorMessage" class="class-list__empty" role="alert">
      <p>{{ errorMessage }}</p>

      <button class="class-list__filter" type="button" @click="loadSessions">Try again</button>
    </div>

    <template v-else>
      <p class="class-list__count" role="status">
        {{ filteredClasses.length }}
        {{ filteredClasses.length === 1 ? 'session' : 'sessions' }} found
      </p>

      <div v-if="filteredClasses.length > 0" class="class-list__grid">
        <ClassCard v-for="classItem in filteredClasses" :key="classItem.id" :class-item="classItem" />
      </div>

      <div v-else class="class-list__empty">
        <p>No sessions match these filters.</p>

        <button class="class-list__filter" type="button" @click="resetFilters">Reset filters</button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.class-list {
  margin-top: 2rem;
}

.class-list__filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.class-list__filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}

.class-list__filter-label {
  color: #78716c;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.class-list__filter {
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

.class-list__filter[aria-pressed='true'] {
  border-color: var(--color-text);
  color: #ffffff;
  background-color: var(--color-text);
}

.class-list__filter:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 4px;
}

.class-list__count {
  margin: 1rem 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.class-list__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  padding: 1px;
  background-color: var(--color-background);
}

.class-list__empty {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

@media (max-width: 1100px) {
  .class-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .class-list__grid {
    grid-template-columns: 1fr;
  }

  .class-list__filters {
    padding: 1.25rem;
  }
}
</style>
