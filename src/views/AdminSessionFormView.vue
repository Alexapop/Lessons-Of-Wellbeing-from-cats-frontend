<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createSession, getCreateSessionError, getSessionOptions } from '@/services/adminService.js'

const auth = useAuthStore()
const router = useRouter()
const formElement = ref(null)

const options = ref(null)
const isLoading = ref(true)
const loadError = ref('')
const isSubmitting = ref(false)
const statusMessage = ref('')

const categoryLabels = {
  YOGA: 'Yoga',
  AYURVEDA: 'Ayurveda',
  KOMBUCHA_TEA_LOUNGE: 'Kombucha Tea Lounge',
}

// Filter values used by the class calendar (?category=...).
const calendarCategories = {
  YOGA: 'yoga',
  AYURVEDA: 'ayurveda',
  KOMBUCHA_TEA_LOUNGE: 'lounge',
}

const levelLabels = {
  GENTLE_RESTORATIVE: 'Gentle / Restorative',
  ALL_LEVELS: 'All levels',
  ENERGETIC_FLOW: 'Energetic flow',
  BEGINNERS: 'Beginners',
}

const form = reactive({
  title: '',
  description: '',
  category: '',
  level: '',
  location: '',
  date: '',
  time: '',
  durationMinutes: 60,
  guideId: '',
  hostIds: [],
})

const errors = reactive({
  title: '',
  description: '',
  category: '',
  level: '',
  location: '',
  date: '',
  time: '',
  durationMinutes: '',
  guideId: '',
  hostIds: '',
})

const fieldOrder = Object.keys(errors)

function toDateInput(date) {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

const today = computed(() => toDateInput(new Date()))

function validateField(name) {
  errors[name] = ''
  const textLimits = { title: 255, description: 500, location: 100 }

  if (name in textLimits) {
    const value = form[name].trim()
    if (!value) errors[name] = 'This field is required.'
    else if (value.length > textLimits[name]) errors[name] = `Use no more than ${textLimits[name]} characters.`
    return
  }

  if (name === 'category' && !form.category) errors.category = 'Choose a category.'
  if (name === 'level' && !form.level) errors.level = 'Choose a level.'
  if (name === 'guideId' && !form.guideId) errors.guideId = 'Choose a guide.'
  if (name === 'hostIds' && form.hostIds.length === 0) errors.hostIds = 'Choose at least one host.'
  if (name === 'date' && !form.date) errors.date = 'Choose a date.'
  if (name === 'time') {
    if (!form.time) errors.time = 'Choose a start time.'
    else if (form.date && new Date(`${form.date}T${form.time}`) <= new Date()) {
      errors.time = 'The session must start in the future.'
    }
  }
  if (name === 'durationMinutes') {
    const duration = Number(form.durationMinutes)
    if (!Number.isInteger(duration) || duration < 15 || duration > 480) {
      errors.durationMinutes = 'Use a duration between 15 and 480 minutes.'
    }
  }
}

async function loadOptions() {
  if (!auth.hasValidSession()) return
  isLoading.value = true
  loadError.value = ''

  try {
    options.value = await getSessionOptions(auth.accessToken)
  } catch (error) {
    if (error.response?.status === 401) {
      auth.logout()
      return
    }
    if (error.response?.status === 403) {
      await router.replace({ name: 'dashboard' })
      return
    }
    loadError.value = 'We could not load the form options. Please try again.'
  } finally {
    isLoading.value = false
  }
}

async function submitSession() {
  if (isSubmitting.value) return
  statusMessage.value = ''

  for (const name of fieldOrder) {
    validateField(name)
  }

  const firstInvalid = fieldOrder.find((name) => errors[name])
  if (firstInvalid) {
    await nextTick()
    formElement.value?.querySelector(`#session-${firstInvalid}`)?.focus()
    return
  }

  isSubmitting.value = true
  try {
    await createSession(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        level: form.level,
        location: form.location.trim(),
        startDateTime: `${form.date}T${form.time}:00`,
        durationMinutes: Number(form.durationMinutes),
        guideId: Number(form.guideId),
        hostIds: form.hostIds.map(Number),
      },
      auth.accessToken,
    )
    // Show the new session in the calendar, already filtered by its category.
    await router.push({ name: 'class-calendar', query: { category: calendarCategories[form.category] } })
  } catch (error) {
    if (error.response?.status === 401) {
      auth.logout()
      return
    }
    statusMessage.value = getCreateSessionError(error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadOptions)
</script>

<template>
  <main class="session-form-page" aria-labelledby="session-form-title">
    <RouterLink class="session-form-page__back" :to="{ name: 'admin' }">← Admin dashboard</RouterLink>
    <h1 id="session-form-title" class="session-form-page__title">Create session</h1>
    <p class="session-form-page__subtitle">New sessions appear in the class calendar so members can book them.</p>

    <p v-if="isLoading" class="session-form-page__muted" role="status">Loading form...</p>

    <div v-else-if="loadError" class="session-form-page__box" role="alert">
      <p>{{ loadError }}</p>
      <button class="session-form-page__secondary" type="button" @click="loadOptions">Try again</button>
    </div>

    <form
      v-else-if="options"
      ref="formElement"
      class="session-form"
      aria-label="Session details"
      novalidate
      @submit.prevent="submitSession"
    >
      <div class="session-form__field session-form__field--wide">
        <label for="session-title">Title *</label>
        <input
          id="session-title"
          v-model="form.title"
          type="text"
          maxlength="255"
          :aria-invalid="Boolean(errors.title)"
          :aria-describedby="errors.title ? 'session-title-error' : undefined"
          @blur="validateField('title')"
        />
        <p v-if="errors.title" id="session-title-error" class="session-form__error" role="alert">{{ errors.title }}</p>
      </div>

      <div class="session-form__field session-form__field--wide">
        <label for="session-description">Description *</label>
        <textarea
          id="session-description"
          v-model="form.description"
          rows="4"
          maxlength="500"
          :aria-invalid="Boolean(errors.description)"
          :aria-describedby="errors.description ? 'session-description-error' : undefined"
          @blur="validateField('description')"
        ></textarea>
        <p v-if="errors.description" id="session-description-error" class="session-form__error" role="alert">
          {{ errors.description }}
        </p>
      </div>

      <div class="session-form__field">
        <label for="session-category">Category *</label>
        <select
          id="session-category"
          v-model="form.category"
          :aria-invalid="Boolean(errors.category)"
          :aria-describedby="errors.category ? 'session-category-error' : undefined"
          @change="validateField('category')"
        >
          <option value="" disabled>Choose a category</option>
          <option v-for="category in options.categories" :key="category" :value="category">
            {{ categoryLabels[category] ?? category }}
          </option>
        </select>
        <p v-if="errors.category" id="session-category-error" class="session-form__error" role="alert">
          {{ errors.category }}
        </p>
      </div>

      <div class="session-form__field">
        <label for="session-level">Level *</label>
        <select
          id="session-level"
          v-model="form.level"
          :aria-invalid="Boolean(errors.level)"
          :aria-describedby="errors.level ? 'session-level-error' : undefined"
          @change="validateField('level')"
        >
          <option value="" disabled>Choose a level</option>
          <option v-for="level in options.levels" :key="level" :value="level">
            {{ levelLabels[level] ?? level }}
          </option>
        </select>
        <p v-if="errors.level" id="session-level-error" class="session-form__error" role="alert">{{ errors.level }}</p>
      </div>

      <div class="session-form__field session-form__field--wide">
        <label for="session-location">Location *</label>
        <input
          id="session-location"
          v-model="form.location"
          type="text"
          maxlength="100"
          :aria-invalid="Boolean(errors.location)"
          :aria-describedby="errors.location ? 'session-location-error' : undefined"
          @blur="validateField('location')"
        />
        <p v-if="errors.location" id="session-location-error" class="session-form__error" role="alert">
          {{ errors.location }}
        </p>
      </div>

      <div class="session-form__field">
        <label for="session-date">Date *</label>
        <input
          id="session-date"
          v-model="form.date"
          type="date"
          :min="today"
          :aria-invalid="Boolean(errors.date)"
          :aria-describedby="errors.date ? 'session-date-error' : undefined"
          @blur="validateField('date')"
        />
        <p v-if="errors.date" id="session-date-error" class="session-form__error" role="alert">{{ errors.date }}</p>
      </div>

      <div class="session-form__field">
        <label for="session-time">Start time *</label>
        <input
          id="session-time"
          v-model="form.time"
          type="time"
          :aria-invalid="Boolean(errors.time)"
          :aria-describedby="errors.time ? 'session-time-error' : undefined"
          @blur="validateField('time')"
        />
        <p v-if="errors.time" id="session-time-error" class="session-form__error" role="alert">{{ errors.time }}</p>
      </div>

      <div class="session-form__field">
        <label for="session-durationMinutes">Duration (minutes) *</label>
        <input
          id="session-durationMinutes"
          v-model="form.durationMinutes"
          type="number"
          min="15"
          max="480"
          step="5"
          :aria-invalid="Boolean(errors.durationMinutes)"
          :aria-describedby="errors.durationMinutes ? 'session-durationMinutes-error' : undefined"
          @blur="validateField('durationMinutes')"
        />
        <p
          v-if="errors.durationMinutes"
          id="session-durationMinutes-error"
          class="session-form__error"
          role="alert"
        >
          {{ errors.durationMinutes }}
        </p>
      </div>

      <div class="session-form__field">
        <label for="session-guideId">Guide *</label>
        <select
          id="session-guideId"
          v-model="form.guideId"
          :aria-invalid="Boolean(errors.guideId)"
          :aria-describedby="errors.guideId ? 'session-guideId-error' : undefined"
          @change="validateField('guideId')"
        >
          <option value="" disabled>Choose a guide</option>
          <option v-for="guide in options.guides" :key="guide.id" :value="guide.id">{{ guide.name }}</option>
        </select>
        <p v-if="errors.guideId" id="session-guideId-error" class="session-form__error" role="alert">
          {{ errors.guideId }}
        </p>
      </div>

      <fieldset
        class="session-form__field session-form__field--wide session-form__hosts"
        :aria-describedby="errors.hostIds ? 'session-hostIds-error' : undefined"
      >
        <legend>Hosts *</legend>
        <label v-for="(host, index) in options.hosts" :key="host.id" class="session-form__checkbox">
          <input
            :id="index === 0 ? 'session-hostIds' : undefined"
            v-model="form.hostIds"
            type="checkbox"
            :value="host.id"
            @change="validateField('hostIds')"
          />
          {{ host.name }}
        </label>
        <p v-if="errors.hostIds" id="session-hostIds-error" class="session-form__error" role="alert">
          {{ errors.hostIds }}
        </p>
      </fieldset>

      <div class="session-form__actions">
        <RouterLink class="session-form-page__secondary" :to="{ name: 'admin' }">Cancel</RouterLink>
        <button class="session-form-page__primary" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creating...' : 'Create Session' }}
        </button>
      </div>

      <p class="session-form__status" role="status">{{ statusMessage }}</p>
    </form>
  </main>
</template>

<style scoped>
.session-form-page {
  width: calc(100% - 2 * var(--page-gutter));
  max-width: 820px;
  min-height: 40vh;
  margin: 5rem auto;
}

.session-form-page__back {
  color: #00664f;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.session-form-page__title {
  margin: 0.5rem 0 0.25rem;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.session-form-page__subtitle,
.session-form-page__muted {
  margin: 0 0 1.5rem;
  color: var(--color-text-secondary);
}

.session-form-page__box {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.session-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.25rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.session-form__field {
  display: grid;
  align-content: start;
  gap: 4px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.session-form__field--wide,
.session-form__actions,
.session-form__status {
  grid-column: 1 / -1;
}

.session-form__field label,
.session-form__field legend {
  padding: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.session-form__field input,
.session-form__field select,
.session-form__field textarea {
  width: 100%;
  min-height: 47px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
}

.session-form__field textarea {
  padding: 12px 14px;
  resize: vertical;
}

.session-form__field [aria-invalid='true'] {
  border-color: #b42318;
}

.session-form__field input:focus-visible,
.session-form__field select:focus-visible,
.session-form__field textarea:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 2px;
}

.session-form__hosts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
}

.session-form__hosts legend {
  margin-bottom: 0.4rem;
}

.session-form__hosts .session-form__error {
  flex-basis: 100%;
}

.session-form__checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  font-size: 14px !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  cursor: pointer;
}

.session-form__checkbox input {
  width: 1.1rem;
  min-height: 1.1rem;
  accent-color: #00664f;
}

.session-form__error {
  margin: 0;
  color: #b42318;
  font-size: 13px;
}

.session-form__actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.session-form-page__primary,
.session-form-page__secondary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  padding: 0 1.25rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.session-form-page__primary {
  border: 0;
  background: var(--color-text);
  color: #ffffff;
}

.session-form-page__primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.session-form-page__secondary {
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
}

.session-form-page__back:focus-visible,
.session-form-page__primary:focus-visible,
.session-form-page__secondary:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.session-form__status {
  margin: 0;
  color: #b42318;
  font-size: 14px;
}

.session-form__status:empty {
  display: none;
}

@media (max-width: 700px) {
  .session-form-page {
    margin: 2.5rem auto;
  }

  .session-form {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .session-form__actions > * {
    width: 100%;
  }

  .session-form__field input,
  .session-form__field select,
  .session-form__field textarea {
    font-size: 16px;
  }
}
</style>
