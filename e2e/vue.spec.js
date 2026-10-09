import { test, expect } from '@playwright/test'

test('navigates from Home to Class Calendar and back using the logo', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Lessons of Wellbeing.*Directly From Cats/,
    }),
  ).toBeVisible()

  const navigation = page.getByRole('navigation', {
    name: 'Main navigation',
  })

  const calendarLink = navigation.getByRole('link', {
    name: 'Class Calendar',
    exact: true,
  })

  await calendarLink.click()

  await expect(page).toHaveURL(/\/class-calendar$/)

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Class & Lounge Visit Calendar',
    }),
  ).toBeVisible()

  await expect(calendarLink).toHaveAttribute('aria-current', 'page')

  const homeLink = navigation.getByRole('link', {
    name: 'Home & Sanctuary',
    exact: true,
  })

  await expect(homeLink).not.toHaveAttribute('aria-current', 'page')

  await page.getByRole('banner').getByRole('link', {
    name: /Lessons of Wellbeing from Cats.*Home/,
  }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(homeLink).toHaveAttribute('aria-current', 'page')
})

test('opens Class Calendar directly and keeps it after reload', async ({
  page,
}) => {
  await page.goto('/class-calendar')
  await page.reload()

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Class & Lounge Visit Calendar',
    }),
  ).toBeVisible()

  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toBeVisible()
})

test('loads the Home hero image', async ({ page }) => {
  await page.goto('/')

  const heroImage = page.getByRole('img', {
    name: 'Two cats sitting on a rug in a bright sanctuary filled with plants',
  })

  await expect(heroImage).toBeVisible()

  await expect.poll(async () => {
    return heroImage.evaluate((image) => {
      return image.complete && image.naturalWidth > 0
    })
  }).toBe(true)
})