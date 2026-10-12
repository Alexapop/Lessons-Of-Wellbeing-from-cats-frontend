import { test, expect } from '@playwright/test'
import { sessions } from './fixtures/sessions.js'

test.beforeEach(async ({ page }) => {
  await page.route('**/api/v1/sessions', (route) => route.fulfill({ json: sessions }))
})

test('keeps expansion independent between class cards', async ({ page }) => {
  await page.goto('/class-calendar')
  const yogaTitle = page.getByRole('button', {
    name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
  })
  const loungeTitle = page.getByRole('button', { name: 'Kombucha Tea Tasting & Cat Meet & Greet' })
  const yogaDetails = page.getByRole('region', {
    name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
  })
  const loungeDetails = page.getByRole('region', {
    name: 'Kombucha Tea Tasting & Cat Meet & Greet',
  })

  await yogaTitle.click()
  await expect(yogaDetails).toBeVisible()
  await expect(loungeTitle).toHaveAttribute('aria-expanded', 'false')
  await expect(loungeDetails).toBeHidden()
  await loungeTitle.click()
  await expect(yogaDetails).toBeVisible()
  await expect(loungeDetails).toBeVisible()
  await yogaTitle.click()
  await expect(yogaDetails).toBeHidden()
  await expect(loungeDetails).toBeVisible()
  await expect(loungeTitle).toHaveAttribute('aria-expanded', 'true')
})

test('returns a filtered-out card to its collapsed state', async ({ page }) => {
  await page.goto('/class-calendar')
  const title = page.getByRole('button', { name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama' })
  const details = page.getByRole('region', {
    name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
  })
  const categories = page.getByRole('group', { name: 'Filter by category' })

  await title.click()
  await expect(details).toBeVisible()
  await categories.getByRole('button', { name: 'Ayurveda', exact: true }).click()
  await expect(title).toHaveCount(0)
  await categories.getByRole('button', { name: 'All', exact: true }).click()
  await expect(title).toBeVisible()
  await expect(title).toHaveAttribute('aria-expanded', 'false')
  await expect(details).toBeHidden()
  await title.click()
  await expect(details).toBeVisible()
})

test('shows the drinks menu for lounge sessions but not yoga', async ({ page }) => {
  await page.goto('/class-calendar')
  await page.getByRole('button', { name: 'Kombucha Tea Tasting & Cat Meet & Greet' }).click()
  const loungeDetails = page.getByRole('region', {
    name: 'Kombucha Tea Tasting & Cat Meet & Greet',
  })
  await expect(
    loungeDetails.getByRole('heading', { name: 'Available teas & kombuchas' }),
  ).toBeVisible()
  for (const drink of [
    "Queen Mia's Royal Chamomile Lavender",
    "Thor's Spark Ginger Citrus Kombucha",
    'Feline Golden Milk & Cardamom Chai',
    'Hibiscus Rose Sparkle Kombucha',
  ]) {
    await expect(loungeDetails.getByText(drink, { exact: true })).toBeVisible()
  }

  await page.getByRole('button', { name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama' }).click()
  const yogaDetails = page.getByRole('region', {
    name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama',
  })
  await expect(yogaDetails).toBeVisible()
  await expect(
    yogaDetails.getByRole('heading', { name: 'Available teas & kombuchas' }),
  ).toHaveCount(0)
})

test('combines category and host filters and resets an empty result', async ({ page }) => {
  await page.goto('/class-calendar')
  const section = page.getByRole('region', { name: 'Classes and lounge sessions' })
  const cards = section.getByRole('article')
  const categories = page.getByRole('group', { name: 'Filter by category' })
  const hosts = page.getByRole('group', { name: 'Filter by host' })

  await expect(cards).toHaveCount(8)
  await categories.getByRole('button', { name: 'Yoga', exact: true }).click()
  await expect(cards).toHaveCount(4)
  await hosts.getByRole('button', { name: 'Mia', exact: true }).click()
  await expect(cards).toHaveCount(1)
  await expect(cards.first()).toContainText('Queen Mia Restorative Cat Nap')

  await categories.getByRole('button', { name: 'Kombucha Tea Lounge' }).click()
  await expect(cards).toHaveCount(0)
  await expect(section).toContainText('No sessions match these filters.')
  await section.getByRole('button', { name: 'Reset filters' }).click()
  await expect(cards).toHaveCount(8)
  await expect(categories.getByRole('button', { name: 'All', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(hosts.getByRole('button', { name: 'All Hosts' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('expands and collapses class details with the keyboard on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/class-calendar')
  const title = page.getByRole('button', { name: 'Queen Mia Restorative Cat Nap Yoga & Pranayama' })
  const details = page.locator('#details-1')

  await expect(title).toHaveAttribute('aria-expanded', 'false')
  await expect(details).toBeHidden()
  await title.focus()
  await title.press('Enter')
  await expect(title).toHaveAttribute('aria-expanded', 'true')
  await expect(details).toBeVisible()
  await expect(details).toContainText('The Velvet Sun Lounge (Main Hall)')
  await expect(details).toContainText('Aria')
  await expect(details.getByRole('button', { name: 'Login to reserve' })).toBeDisabled()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1)
  await title.press('Space')
  await expect(details).toBeHidden()
  await expect(title).toHaveAttribute('aria-expanded', 'false')
})

test('shows an error message when the sessions cannot be loaded', async ({ page }) => {
  await page.route('**/api/v1/sessions', (route) => route.fulfill({ status: 500 }))
  await page.goto('/class-calendar')

  await expect(page.getByRole('alert')).toContainText('We could not load the sessions.')
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible()
})
