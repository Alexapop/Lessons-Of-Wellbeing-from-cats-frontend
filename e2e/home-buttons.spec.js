import { test, expect } from '@playwright/test'

const calendarLinks = [
  { label: 'Mia card', href: '/class-calendar?host=mia', category: 'All', host: 'Mia' },
  { label: 'Thor card', href: '/class-calendar?host=thor', category: 'All', host: 'Thor' },
  {
    label: 'Yoga & Ayurveda section',
    href: '/class-calendar?category=yoga',
    category: 'Yoga',
    host: 'All Hosts',
  },
  {
    label: 'Kombucha & Tea lounge section',
    href: '/class-calendar?category=lounge',
    category: 'Kombucha Tea Lounge',
    host: 'All Hosts',
  },
]

async function expectSelectedFilters(page, category, host) {
  const categories = page.getByRole('group', { name: 'Filter by category' })
  const hosts = page.getByRole('group', { name: 'Filter by host' })

  await expect(categories.getByRole('button', { name: category, exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(hosts.getByRole('button', { name: host, exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
}

test('hero buttons open the class calendar and the wellbeing lessons', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Reserve class or visit/ }).click()
  await expect(page).toHaveURL(/\/class-calendar$/)
  await expectSelectedFilters(page, 'All', 'All Hosts')

  await page.goto('/')
  await page.getByRole('link', { name: 'Read wellbeing lessons' }).click()
  await expect(page).toHaveURL(/\/wellbeing-lessons$/)
  await expect(page.getByRole('heading', { name: /Lessons of Wellbeing from Cats/ })).toBeVisible()
})

for (const link of calendarLinks) {
  test(`${link.label} button opens the calendar with the matching filter`, async ({ page }) => {
    await page.goto('/')
    await page.locator(`main a[href="${link.href}"]`).click()
    await expect(page).toHaveURL((url) => `${url.pathname}${url.search}` === link.href)
    await expectSelectedFilters(page, link.category, link.host)
  })
}

test('"Practice in Class" opens the calendar filtered by the lesson host', async ({ page }) => {
  await page.goto('/wellbeing-lessons')
  await page.getByRole('button', { name: 'The Art of the Slow Starting' }).click()
  await page
    .getByRole('link', { name: /Practice in Class/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/class-calendar\?host=thor$/)
  await expectSelectedFilters(page, 'All', 'Thor')
})
