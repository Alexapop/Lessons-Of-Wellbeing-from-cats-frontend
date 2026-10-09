<template>
  <section class="calendar-hero" aria-labelledby="calendar-title">
    <p class="calendar-hero__eyebrow">
      <svg
        class="calendar-hero__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
      Schedule &amp; Spot Reservation
    </p>

    <h1 id="calendar-title" class="calendar-hero__title">Class &amp; Lounge Visit Calendar</h1>

    <p class="calendar-hero__description">
      Reserve your spot for Yoga, Ayurveda, or a Kombucha &amp; Tea Lounge Session.
    </p>
    <p class="calendar-hero__note">
      <strong>Note:</strong> You must be registered and logged in to make a reservation.
    </p>

    <div class="calendar-hero__hours">
      <p class="calendar-hero__schedule">
        <svg
          class="calendar-hero__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span>
          <strong>Sanctuary hours:</strong> Mon - Sat: 7:30 AM - 9:00 AM &amp; 4:30 PM - 9:00 PM
        </span>
      </p>
      <p class="calendar-hero__closure">
        <span aria-hidden="true">&#128081;</span>
        <span>Closed on Sundays for Mia's Royal Nap</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.calendar-hero {
  min-width: 0;
  padding: var(--hero-padding);
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.calendar-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.75rem;
  color: #a8a29e;
  font-size: var(--eyebrow-size);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calendar-hero__icon {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}

.calendar-hero__eyebrow .calendar-hero__icon {
  color: var(--color-text);
}

.calendar-hero__title {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--hero-title-size);
  font-weight: 700;
  line-height: 1.2;
}

.calendar-hero__description,
.calendar-hero__note {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--section-text-size);
  line-height: 1.65;
}

.calendar-hero__description {
  margin-top: 2rem;
}

.calendar-hero__note strong {
  color: var(--color-heading);
}

.calendar-hero__hours {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  max-width: 60rem;
  margin-top: 2.25rem;
  padding: 1.125rem 1.25rem;
  border: 1px solid #fcd34d;
  border-radius: 0.25rem;
  background-color: #fffbeb;
  color: #92400e;
  font-size: 0.875rem;
}

.calendar-hero__schedule,
.calendar-hero__closure {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.calendar-hero__schedule strong {
  color: #92400e;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.calendar-hero__schedule .calendar-hero__icon {
  color: #b45309;
}

@media (max-width: 480px) {
  .calendar-hero__schedule,
  .calendar-hero__closure {
    align-items: flex-start;
  }
}
</style>
