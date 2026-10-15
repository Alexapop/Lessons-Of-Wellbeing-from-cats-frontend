import { test, expect } from '@playwright/test'

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