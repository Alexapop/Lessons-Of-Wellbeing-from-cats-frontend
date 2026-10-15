<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import HomeSanctuary from './HomeSanctuary.vue'

const router = useRouter()
const registerDialog = ref(null)
const showPassword = ref(false)
const statusMessage = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  password: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  password: '',
})


const fields = [
  {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    autocomplete: 'given-name',
    placeholder: 'e.g. Elena',
    icon: 'person',
  },
  {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    autocomplete: 'family-name',
    placeholder: 'e.g. Vance',
    icon: 'person',
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    autocomplete: 'email',
    placeholder: 'elena@example.com',
    icon: 'email',
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    autocomplete: 'tel',
    placeholder: 'e.g. +34 612 345 678',
    icon: 'phone',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    autocomplete: 'street-address',
    placeholder: 'e.g. 742 Evergreen Terrace, Springfield',
    icon: 'location',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    autocomplete: 'new-password',
    placeholder: '••••••••',
    icon: 'key',
  },
]

function validateField(name) {
  const value = form[name].trim()
  errors[name] = ''

  if (!value) {
    const messages = {
      firstName: 'Enter your first name.',
      lastName: 'Enter your last name.',
      email: 'Enter your email address.',
      phone: 'Enter your phone number.',
      address: 'Enter your address.',
      password: 'Enter your password.',
    }

    errors[name] = messages[name]
    return
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.email = 'Enter a valid email address.'
  }

  if (name === 'phone') {
    const digits = value.replace(/\D/g, '')
    const validCharacters = /^\+?[\d\s().-]+$/.test(value)

    if (!validCharacters || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number.'
    }
  }
}

function handleInput(name) {
  statusMessage.value = ''

  if (errors[name]) {
    validateField(name)
  }
}

async function submitRegister() {
  statusMessage.value = ''

  for (const field of fields) {
    validateField(field.name)
  }

  const firstInvalidField = fields.find((field) => errors[field.name])

  if (firstInvalidField) {
    await nextTick()
    const input = registerDialog.value.querySelector(
      `#register-${firstInvalidField.name}`,
    )
    input?.focus()
    return
  }

  statusMessage.value =
    'The form is valid. Account creation is not available yet.'
}

function closeRegister() {
  router.push({ name: 'home' })
}

let previousOverflow = ''

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  registerDialog.value.showModal()
})

onBeforeUnmount(() => {
  registerDialog.value?.close()
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <HomeSanctuary />

  <dialog
    ref="registerDialog"
    class="register-dialog"
    aria-labelledby="register-title"
    aria-describedby="register-description"
    @cancel.prevent="closeRegister"
  >
    <button
      class="register-close"
      type="button"
      aria-label="Close registration"
      @click="closeRegister"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>

    <header class="register-header">
      <span class="register-emblem">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 10 4 3l6 3h4l6-3-1 7a8 8 0 1 1-14 0Z" />
          <path d="M8 12h.01M16 12h.01M11 16h2" />
        </svg>
      </span>

      <h1 id="register-title">Create Profile</h1>

      <p id="register-description">
        Create your profile to reserve Yoga &amp; Ayurveda classes and Kombucha
        lounge visits with Mia &amp; Thor.
      </p>
    </header>

    <form
      class="register-form"
      aria-label="Create profile"
      novalidate
      @submit.prevent="submitRegister"
    >
      <div
        v-for="field in fields"
        :key="field.name"
        class="register-field"
        :class="{
          'register-field--half':
            field.name === 'firstName' || field.name === 'lastName',
        }"
      >
        <label :for="`register-${field.name}`">{{ field.label }} *</label>

        <div class="register-input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g v-if="field.icon === 'person'">
              <circle cx="12" cy="7" r="4" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </g>

            <g v-else-if="field.icon === 'email'">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </g>

            <path
              v-else-if="field.icon === 'phone'"
              d="M22 16.9v3a2 2 0 0 1-2.2 2
                 19.8 19.8 0 0 1-8.6-3.1
                 19.5 19.5 0 0 1-6-6
                 19.8 19.8 0 0 1-3.1-8.7
                 A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7
                 c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9
                 a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5
                 c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"
            />

            <g v-else-if="field.icon === 'location'">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </g>

            <g v-else>
              <circle cx="7.5" cy="16.5" r="5" />
              <path d="m11 13 10-10M16 8l3 3M18 6l3 3" />
            </g>
          </svg>

          <input
            :id="`register-${field.name}`"
            v-model="form[field.name]"
            :name="field.name"
            :type="
              field.name === 'password' && showPassword ? 'text' : field.type
            "
            :autocomplete="field.autocomplete"
            :placeholder="field.placeholder"
            :aria-invalid="Boolean(errors[field.name])"
            :aria-describedby="
              errors[field.name] ? `register-${field.name}-error` : undefined
            "
            required
            @blur="validateField(field.name)"
            @input="handleInput(field.name)"
          />

          <button
            v-if="field.name === 'password'"
            class="register-password-toggle"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              <path v-if="showPassword" d="m3 3 18 18" />
            </svg>
          </button>
        </div>

        <p
          v-if="errors[field.name]"
          :id="`register-${field.name}-error`"
          class="register-error"
          role="alert"
        >
          {{ errors[field.name] }}
        </p>
      </div>

      <button class="register-submit" type="submit">Create Profile</button>

      <p class="register-status" role="status">{{ statusMessage }}</p>
    </form>

    <p class="register-login">
      Already registered?
      <RouterLink :to="{ name: 'login' }">Sign in here</RouterLink>
    </p>
  </dialog>
</template>

<style scoped>
.register-dialog {
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  width: min(640px, calc(100% - 2rem));
  max-width: none;
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: 40px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 24px 48px rgb(0 0 0 / 18%);
}

.register-dialog::backdrop {
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(5px);
}

.register-dialog svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.register-close {
  position: absolute;
  top: 24px;
  right: 24px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  color: #a8a29e;
  cursor: pointer;
}

.register-header {
  text-align: center;
}

.register-emblem {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  border: 1px solid var(--color-border);
  background: #f5f5f4;
}

.register-emblem svg {
  width: 30px;
  height: 30px;
}

.register-header h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 32px;
  line-height: 1.3;
  color: var(--color-heading);
}

.register-header p {
  margin: 12px 0 24px;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.register-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.register-field {
  display: grid;
  grid-column: 1 / -1;
  align-content: start;
  gap: 4px;
  min-width: 0;
}

.register-field--half {
  grid-column: span 1;
}

.register-field label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.register-input {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 47px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  color: #a8a29e;
}

.register-input input {
  width: 100%;
  min-width: 0;
  padding: 12px 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
}

.register-input input::placeholder {
  color: #92908e;
  opacity: 1;
}

.register-input input:focus {
  outline: none;
}

.register-input:focus-within {
  outline: 2px solid #00664f;
  outline-offset: 2px;
}

.register-input:has(input[aria-invalid='true']) {
  border-color: #b42318;
}

.register-password-toggle {
  display: grid;
  place-items: center;
  align-self: stretch;
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: #a8a29e;
  cursor: pointer;
}

.register-submit {
  grid-column: 1 / -1;
  min-height: 50px;
  margin-top: 16px;
  border: 0;
  background: var(--color-text);
  color: white;
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.register-error {
  margin: 0;
  color: #b42318;
  font-size: 13px;
}

.register-status {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.register-status:empty {
  display: none;
}

.register-login {
  margin: 24px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 14px;
  text-align: center;
}

.register-login a {
  margin-left: 6px;
  color: var(--color-heading);
  font-weight: 700;
  text-decoration: underline;
}

button:focus-visible,
.register-login a:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .register-dialog {
    padding: 32px 20px;
  }

  .register-close {
    top: 10px;
    right: 10px;
  }

  .register-header h1 {
    font-size: 28px;
  }

  .register-field--half {
    grid-column: 1 / -1;
  }

  .register-input input {
    font-size: 16px;
  }
}
</style>