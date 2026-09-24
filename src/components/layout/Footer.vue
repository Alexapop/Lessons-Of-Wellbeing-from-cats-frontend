<script setup>
import { RouterLink } from 'vue-router'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__about">
        <RouterLink class="site-footer__brand" to="/">
          <span class="site-footer__logo" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 10 4 3l6 3h4l6-3-1 7a8 8 0 1 1-14 0Z" />
              <path d="M8 12h.01M16 12h.01M11 16h2" />
            </svg>
          </span>

          <span>Lessons of Wellbeing from Cats</span>
        </RouterLink>

        <p class="site-footer__description">
          A serene sanctuary dedicated to feline wisdom, restorative Yoga, Ayurvedic balance, and
          organic Kombucha &amp; Tea lounge visits with Mia and Thor.
        </p>

        <p class="site-footer__copyright">
          © {{ currentYear }} Lessons of Wellbeing from Cats. Designed for Mia &amp; Thor.
          <span>
            Crafted with
            <span class="site-footer__heart" role="img" aria-label="love">♥</span>
            &amp; pure feline purrs
          </span>
        </p>
      </div>

      <section aria-labelledby="footer-location-title">
        <h2 id="footer-location-title" class="site-footer__heading">
          Sanctuary Locations &amp; Hours
        </h2>

        <ul class="site-footer__list">
          <li class="site-footer__item">
            <svg
              class="site-footer__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <address>Calle Cabrales 45, 33201 Gijón, Asturias, Spain</address>
          </li>

          <li class="site-footer__item">
            <svg
              class="site-footer__icon"
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

            <p>
              <span class="site-footer__line">
                Mon - Sat: <span class="site-footer__time">7:30 AM - 9:00 AM</span> &amp;
                <span class="site-footer__time">4:30 PM - 9:00 PM</span>
              </span>
              <span class="site-footer__line">(Closed on Sundays for Mia's Royal Nap)</span>
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title" class="site-footer__heading">Contact</h2>

        <ul class="site-footer__list">
          <li class="site-footer__item">
            <svg
              class="site-footer__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M22 16.9v3a2 2 0 0 1-2.2 2
                   19.8 19.8 0 0 1-8.6-3.1
                   19.5 19.5 0 0 1-6-6
                   19.8 19.8 0 0 1-3.1-8.7
                   A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7
                   c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9
                   a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5
                   c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"
              />
            </svg>

            <p>
              Call / WhatsApp:
              <a class="site-footer__link" href="tel:+34688990123"> +34 688 990 123 </a>
            </p>
          </li>

          <li class="site-footer__item">
            <svg
              class="site-footer__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
              <path d="M17 8h1a3 3 0 1 1 0 6h-1M8 2v2M12 2v2M16 2v2" />
            </svg>

            <p>Kombucha &amp; Tea tastings require reservation in advance.</p>
          </li>
        </ul>

        <div class="site-footer__payment">
          <svg
            class="site-footer__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>

          <p><strong>Payment Methods:</strong> Only Cash or Bizum accepted.</p>
        </div>
      </section>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 0;
  border-top: 1px solid #e5e3e1;
  background-color: #fcfbf8;
}

.site-footer__container {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.1fr) minmax(0, 1.1fr);
  align-items: start;
  gap: 1.25rem;
  width: calc(100% - 2 * clamp(1rem, 4vw, 4rem));
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 1rem 0;
}

.site-footer__container > * {
  min-width: 0;
}

.site-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
  text-decoration: none;
  text-transform: uppercase;
}

.site-footer__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  color: #ffffff;
  background-color: #00664f;
}

.site-footer__logo svg {
  width: 1.4rem;
  height: 1.4rem;
}

.site-footer__description {
  max-width: 85ch;
  margin: 0.5rem 0 0;
  color: #57534e;
  font-size: 0.8125rem;
  line-height: 1.4;
}

.site-footer__copyright {
  margin: 0.5rem 0 0;
  color: #78716c;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.3;
}

.site-footer__copyright > span {
  display: block;
  margin-top: 0;
}

.site-footer__heart {
  color: #00664f;
}

.site-footer__heading {
  margin: 0 0 0.5rem;
  color: #1c1917;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
}

.site-footer__list {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__item,
.site-footer__payment {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #57534e;
  font-size: 0.8125rem;
  line-height: 1.4;
}

.site-footer__icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
  color: #00664f;
}

.site-footer__item p,
.site-footer__payment p {
  margin: 0;
}

.site-footer__line {
  display: block;
}

.site-footer__time {
  white-space: nowrap;
}

.site-footer__item address {
  font-style: normal;
}

.site-footer__link {
  color: inherit;
  text-decoration: none;
}

.site-footer__link:hover {
  color: #00664f;
  text-decoration: underline;
}

.site-footer__link:focus-visible,
.site-footer__brand:focus-visible {
  outline: 2px solid #00664f;
  outline-offset: 4px;
}

.site-footer__payment {
  margin-top: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid #b8dfcf;
  border-radius: 0.7rem;
  color: #1c1917;
  background-color: #effaf4;
}

@media (max-width: 1400px) {
  .site-footer__container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding: 1rem 0;
  }

  .site-footer__about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 800px) {
  .site-footer {
    margin-top: 0;
  }

  .site-footer__container {
    grid-template-columns: 1fr;
    padding: 1rem 0;
  }

  .site-footer__brand {
    font-size: 1.125rem;
  }
}
</style>
