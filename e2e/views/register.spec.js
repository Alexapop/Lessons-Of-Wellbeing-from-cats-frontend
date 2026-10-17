import { test, expect } from '@playwright/test'

async function fillRegistration(page) {
  await page.goto('/register')
  await page.getByLabel('First name').fill('Ana')
  await page.getByLabel('Last name').fill('Pop')
  await page.getByLabel('Email address').fill('ana@example.com')
  await page.getByLabel('Phone number').fill('+34 612 345 678')
  await page.getByLabel('Address *', { exact: true }).fill('Madrid')
  await page.getByLabel('Password *', { exact: true }).fill('NewPassword123!')
}

test('registration sends the form and redirects to login after success', async ({ page }) => {
  await page.route('**/api/v1/auth/register', async (route) => {
    expect(route.request().method()).toBe('POST')
    expect(route.request().postDataJSON()).toEqual({
      firstName: 'Ana', lastName: 'Pop', email: 'ana@example.com',
      phoneNumber: '+34 612 345 678', address: 'Madrid', password: 'NewPassword123!',
    })
    await route.fulfill({ status: 201, json: { id: 2, email: 'ana@example.com', role: 'USER' } })
  })
  await fillRegistration(page)
  await page.getByRole('button', { name: 'Create Profile & Access Bookings' }).click()
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible()
})

test('duplicate email keeps registration open and focuses email', async ({ page }) => {
  await page.route('**/api/v1/auth/register', (route) => route.fulfill({ status: 409, json: { status: 409 } }))
  await fillRegistration(page)
  await page.getByRole('button', { name: 'Create Profile & Access Bookings' }).click()
  await expect(page.getByRole('status')).toHaveText('An account with this email already exists.')
  await expect(page.getByLabel('Email address')).toBeFocused()
  await expect(page).toHaveURL(/\/register$/)
})

test('network failure allows retry and invalid password prevents submission', async ({ page }) => {
  let requests = 0
  await page.route('**/api/v1/auth/register', (route) => { requests++; return route.abort() })
  await fillRegistration(page)
  await page.getByLabel('Password *', { exact: true }).fill('short')
  await page.getByRole('button', { name: 'Create Profile & Access Bookings' }).click()
  await expect(page.getByRole('alert')).toContainText('at least 8 characters')
  expect(requests).toBe(0)
  await page.getByLabel('Password *', { exact: true }).fill('NewPassword123!')
  await page.getByRole('button', { name: 'Create Profile & Access Bookings' }).click()
  await expect(page.getByRole('status')).toHaveText('Unable to reach the server. Please try again.')
  await expect(page.getByRole('button', { name: 'Create Profile & Access Bookings' })).toBeEnabled()
})
