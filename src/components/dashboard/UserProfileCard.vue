<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['logout'])

const fullName = computed(() =>
  [props.user.firstName, props.user.lastName].filter(Boolean).join(' '),
)

const initial = computed(() => (props.user.firstName ?? props.user.email ?? '?').charAt(0).toUpperCase())

// Display handle built from the user's name, e.g. "Sophea Lin" -> "@sophealin".
const handle = computed(
  () =>
    '@' +
    fullName.value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ''),
)
</script>

<template>
  <section class="profile-card" aria-labelledby="profile-name">
    <span class="profile-card__avatar" aria-hidden="true">{{ initial }}</span>

    <div class="profile-card__info">
      <h2 id="profile-name" class="profile-card__name">
        {{ fullName }}
        <svg class="profile-card__icon profile-card__verified" viewBox="0 0 24 24" aria-label="Verified member" role="img">
          <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </h2>
      <p class="profile-card__handle">{{ handle }}</p>

      <ul class="profile-card__contact">
        <li>
          <svg class="profile-card__icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </svg>
          <span class="visually-hidden">Email:</span>
          <span>{{ user.email }}</span>
        </li>
        <li v-if="user.phoneNumber">
          <svg class="profile-card__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6
                 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8
                 a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5
                 c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"
            />
          </svg>
          <span class="visually-hidden">Phone:</span>
          <span>{{ user.phoneNumber }}</span>
        </li>
        <li v-if="user.address">
          <svg class="profile-card__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span class="visually-hidden">Address:</span>
          <span>{{ user.address }}</span>
        </li>
      </ul>
    </div>

    <button class="profile-card__logout" type="button" @click="emit('logout')">
      <svg class="profile-card__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 3H4v18h6M21 12H9M15 6l6 6-6 6" />
      </svg>
      Logout
    </button>
  </section>
</template>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  padding: 2.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  overflow-wrap: anywhere;
}

.profile-card__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 1px solid var(--color-border);
  background-color: #f5f5f4;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.profile-card__info {
  flex: 1;
  min-width: 0;
}

.profile-card__name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.profile-card__handle {
  margin: 0.25rem 0 0.75rem;
  color: #78716c;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
}

.profile-card__contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 0;
  padding: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  list-style: none;
}

.profile-card__contact li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.profile-card__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.profile-card__verified {
  width: 24px;
  height: 24px;
}

.profile-card__logout {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  align-self: flex-end;
  min-height: 2.75rem;
  padding: 0.6rem 1.25rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.profile-card__logout:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 3px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 700px) {
  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
  }

  .profile-card__name {
    font-size: 1.6rem;
  }

  .profile-card__logout {
    align-self: stretch;
    justify-content: center;
  }
}
</style>
