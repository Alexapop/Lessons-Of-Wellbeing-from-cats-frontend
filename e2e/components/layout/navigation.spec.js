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

