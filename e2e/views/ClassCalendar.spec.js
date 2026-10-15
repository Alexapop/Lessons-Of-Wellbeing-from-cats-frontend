import { test, expect } from '@playwright/test'

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

