<script setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getSessionById, getSessionError } from '@/services/sessionService.js'

const props = defineProps({
  sessionId: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['confirm'])

const router = useRouter()
const auth = useAuthStore()
const formElement = ref(null)

const session = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const statusMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
})

const fields = [
  { name: 'name', label: 'Full name', type: 'text', autocomplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel' },
]

function prefillFromUser(user) {
  form.name = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
  form.email = user?.email ?? ''
  form.phone = user?.phoneNumber ?? ''
}

async function loadSession() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    session.value = await getSessionById(props.sessionId, auth.accessToken)
  } catch (error) {
    if (error.response?.status === 401) {
      auth.logout()
      await router.replace({ name: 'login' })
      return
    }
    errorMessage.value = getSessionError(error)
  } finally {
    isLoading.value = false
  }
}

function validateField(name) {
  const value = form[name].trim()
  errors[name] = ''

  if (!value) {
    const messages = {
      name: 'Enter your full name.',
      email: 'Enter your email address.',
      phone: 'Enter your phone number.',
    }
    errors[name] = messages[name]
    return
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.email = 'Enter a valid email address.'
  }

  if (name === 'phone') {
    const digits = value.replace(/\D/g, '')
    if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number.'
    }
  }
}

function handleInput(name) {
  statusMessage.value = ''
  if (errors[name]) validateField(name)
}

async function submitReservation() {
  statusMessage.value = ''

  for (const field of fields) {
    validateField(field.name)
  }

  const firstInvalidField = fields.find((field) => errors[field.name])
  if (firstInvalidField) {
    await nextTick()
    formElement.value?.querySelector(`#reservation-${firstInvalidField.name}`)?.focus()
    return
  }

  emit('confirm', {
    sessionId: session.value.id,
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
  })
  statusMessage.value = `Thank you, ${form.name.trim()}. Your details for “${session.value.title}” are ready.`
}

watch(() => auth.user, prefillFromUser, { immediate: true })
watch(() => props.sessionId, loadSession)
onMounted(loadSession)
</script>

<template>
  <section class="reservation" aria-labelledby="reservation-title">
    <header class="reservation__header">
      <h1 id="reservation-title">Reserve your place</h1>
      <p>Check your details and confirm your attendance.</p>
    </header>

    <p v-if="isLoading" class="reservation__status" role="status">Loading session...</p>

    <div v-else-if="errorMessage" class="reservation__error-box" role="alert">
      <p>{{ errorMessage }}</p>
      <button class="reservation__secondary" type="button" @click="loadSession">Try again</button>
    </div>

    <template v-else-if="session">
      <dl class="reservation__summary" aria-label="Session summary">
        <div class="reservation__summary-title">
          <dt>Session</dt>
          <dd>{{ session.title }}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd><time :datetime="session.date">{{ session.date }}</time></dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{{ session.startTime }} – {{ session.endTime }} ({{ session.duration }} mins)</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{{ session.location }}</dd>
        </div>
        <div>
          <dt>Guide</dt>
          <dd>{{ session.guide }}</dd>
        </div>
      </dl>

      <form
        ref="formElement"
        class="reservation__form"
        aria-label="Reservation details"
        novalidate
        @submit.prevent="submitReservation"
      >
        <div v-for="field in fields" :key="field.name" class="reservation__field">
          <label :for="`reservation-${field.name}`">{{ field.label }} *</label>
          <input
            :id="`reservation-${field.name}`"
            v-model="form[field.name]"
            :name="field.name"
            :type="field.type"
            :autocomplete="field.autocomplete"
            :aria-invalid="Boolean(errors[field.name])"
            :aria-describedby="errors[field.name] ? `reservation-${field.name}-error` : undefined"
            required
            @blur="validateField(field.name)"
            @input="handleInput(field.name)"
          />
          <p
            v-if="errors[field.name]"
            :id="`reservation-${field.name}-error`"
            class="reservation__error"
            role="alert"
          >
            {{ errors[field.name] }}
          </p>
        </div>

        <div class="reservation__actions">
          <RouterLink class="reservation__secondary" :to="{ name: 'class-calendar' }">
            Back to calendar
          </RouterLink>
          <button class="reservation__submit" type="submit">Confirm attendance</button>
        </div>

        <p class="reservation__status" role="status">{{ statusMessage }}</p>
      </form>
    </template>
  </section>
</template>

<style scoped>
.reservation {
  width: min(640px, 100%);
  margin: 0 auto;
  padding: 40px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
}

.reservation__header {
  text-align: center;
}

.reservation__header h1 {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 32px;
  line-height: 1.3;
}

.reservation__header p {
  margin: 12px 0 24px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.reservation__summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0 0 24px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background-color: #fafaf9;
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

.reservation__summary-title {
  grid-column: 1 / -1;
}

.reservation__summary dt {
  color: var(--color-heading);
  font-weight: 700;
}

.reservation__summary dd {
  margin: 0;
  color: var(--color-text-secondary);
}

.reservation__form {
  display: grid;
  gap: 16px;
}

.reservation__field {
  display: grid;
  gap: 4px;
}

.reservation__field label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.reservation__field input {
  min-height: 47px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
}

.reservation__field input:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 2px;
}

.reservation__field input[aria-invalid='true'] {
  border-color: #b42318;
}

.reservation__error {
  margin: 0;
  color: #b42318;
  font-size: 13px;
}

.reservation__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.reservation__submit,
.reservation__secondary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  padding: 0 1.25rem;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.reservation__submit {
  border: 0;
  background: var(--color-text);
  color: white;
}

.reservation__secondary {
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
}

.reservation__submit:focus-visible,
.reservation__secondary:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.reservation__status {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.reservation__status:empty {
  display: none;
}

.reservation__error-box {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

@media (max-width: 480px) {
  .reservation {
    padding: 32px 20px;
  }

  .reservation__summary {
    grid-template-columns: 1fr;
  }

  .reservation__actions > * {
    width: 100%;
  }

  .reservation__field input {
    font-size: 16px;
  }
}
</style>
