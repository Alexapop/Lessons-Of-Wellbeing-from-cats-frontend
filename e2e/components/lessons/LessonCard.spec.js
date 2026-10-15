import { expectSelectedFilters } from '../calendar/filterAssertions.js'
import { test, expect } from '@playwright/test'

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
