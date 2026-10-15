<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import HomeSanctuary from './HomeSanctuary.vue'
import { useAuthStore } from '@/stores/auth'
import { getLoginError } from '@/services/authService'

const router = useRouter()
const auth = useAuthStore()
const isSubmitting = ref(false)
let isActive = true
const loginDialog = ref(null)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)
const statusMessage = ref('')

const emailError = computed(() => {
  if (!emailTouched.value) return ''
  const value = email.value.trim()
  if (!value) return 'Enter your email address.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address.'
  }
  return ''
})

const passwordError = computed(() => {
  if (passwordTouched.value && !password.value.trim()) return 'Enter your password.'
  return ''
})

async function submitLogin() {
  if (isSubmitting.value) return
  emailTouched.value = true
  passwordTouched.value = true
  statusMessage.value = ''

  if (emailError.value) {
    loginDialog.value.querySelector('#login-email').focus()
    return
  }
  if (passwordError.value) {
    loginDialog.value.querySelector('#login-password').focus()
    return
  }

  isSubmitting.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    password.value = ''
    if (isActive) await router.replace({ name: 'dashboard' })
  } catch (error) {
    statusMessage.value = getLoginError(error)
  } finally {
    isSubmitting.value = false
  }
}
let previousOverflow = ''

function closeLogin() {
  router.push('/')
}

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  loginDialog.value.showModal()
})

onBeforeUnmount(() => {
  isActive = false
  document.body.style.overflow = previousOverflow
  loginDialog.value?.close()
})
</script>

<template>
  <HomeSanctuary />

  <dialog
    ref="loginDialog"
    class="login-dialog"
    aria-labelledby="login-title"
    aria-describedby="login-description"
    @cancel.prevent="closeLogin"
  >
    <button class="login-close" type="button" aria-label="Close login" @click="closeLogin">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </button>

    <header class="login-header">
      <span class="login-emblem">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 10 4 3l6 3h4l6-3-1 7a8 8 0 1 1-14 0Z" />
          <path d="M8 12h.01M16 12h.01M11 16h2" />
        </svg>
      </span>
      <h1 id="login-title">Welcome Back</h1>
      <p id="login-description">Sign in to access your bookings and sanctuary experiences.</p>
    </header>

    <form class="login-form" aria-label="Sign in" novalidate @submit.prevent="submitLogin">
      <div class="login-field">
        <label for="login-email">Email address *</label>
        <div class="login-input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="7" r="4" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
          </svg>
          <input
            id="login-email"
            v-model="email"
            :aria-invalid="Boolean(emailError)"
            :aria-describedby="emailError ? 'login-email-error' : undefined"
            @blur="emailTouched = true"
            @input="statusMessage = ''"
            name="email"
            type="email"
            autocomplete="email"
            autocapitalize="none"
            :spellcheck="false"
            placeholder="e.g. elena@example.com"
            required
          />
        </div>
        <p v-if="emailError" id="login-email-error" class="login-error" role="alert">
          {{ emailError }}
        </p>
      </div>

      <div class="login-field">
        <label for="login-password">Password *</label>
        <div class="login-input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="7.5" cy="16.5" r="5" />
            <path d="m11 13 10-10M16 8l3 3M18 6l3 3" />
          </svg>
          <input
            id="login-password"
            v-model="password"
            :aria-invalid="Boolean(passwordError)"
            :aria-describedby="passwordError ? 'login-password-error' : undefined"
            @blur="passwordTouched = true"
            @input="statusMessage = ''"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="••••••••"
            required
          />
          <button
            class="login-password-toggle"
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
      </div>

      <p v-if="passwordError" id="login-password-error" class="login-error" role="alert">
        {{ passwordError }}
      </p>

      <button class="login-submit" type="submit" :disabled="isSubmitting" :aria-busy="isSubmitting">
        {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
      </button>
      <p class="login-status" role="status">{{ statusMessage }}</p>
    </form>

    <p class="login-register">
      New to the sanctuary?
      <RouterLink :to="{ name: 'register' }">Create profile here</RouterLink>
    </p>
  </dialog>
</template>

<style scoped>
.login-dialog {
  position: fixed;
  inset: 0;
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

.login-dialog::backdrop {
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(5px);
}

.login-dialog svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.login-close {
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

.login-header {
  text-align: center;
}

.login-emblem {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  border: 1px solid var(--color-border);
  background: #f5f5f4;
}

.login-emblem svg {
  width: 30px;
  height: 30px;
}

.login-header h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 32px;
  line-height: 1.3;
  color: var(--color-heading);
}

.login-header p {
  margin: 12px 0 24px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.login-form {
  display: grid;
  gap: 16px;
}
.login-field {
  display: grid;
  gap: 4px;
}

.login-field label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.login-input {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 47px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  color: #a8a29e;
}

.login-input input {
  width: 100%;
  min-width: 0;
  padding: 12px 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
}

.login-input input::placeholder {
  color: #92908e;
  opacity: 1;
}
.login-input input:focus {
  outline: none;
}
.login-input:focus-within {
  outline: 2px solid #00664f;
  outline-offset: 2px;
}

.login-password-toggle {
  display: grid;
  place-items: center;
  align-self: stretch;
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: #a8a29e;
  cursor: pointer;
}

.login-submit {
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

.login-error {
  margin: 0;
  color: #b42318;
  font-size: 13px;
}

.login-input:has(input[aria-invalid='true']) {
  border-color: #b42318;
}

.login-status {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.login-status:empty {
  display: none;
}

.login-register {
  margin: 10px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  text-align: center;
}

.login-register a {
  margin-left: 6px;
  color: var(--color-heading);
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

button:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .login-dialog {
    padding: 32px 20px;
  }
  .login-close {
    top: 10px;
    right: 10px;
  }
  .login-header h1 {
    font-size: 28px;
  }
  .login-input input {
    font-size: 16px;
  }
}
</style>
