import { test, expect } from '@playwright/test'

const user = { id: 1, firstName: 'Elena', lastName: 'Pop', email: 'elena@example.com', role: 'USER' }

async function mockLogin(page, expiresIn = 900) {
  await page.route('**/api/v1/auth/login', async (route) => {
    expect(route.request().postDataJSON()).toEqual({
      email: 'elena@example.com', password: 'TestPassword123!',
    })
    await route.fulfill({ json: { accessToken: 'test-token', tokenType: 'Bearer', expiresIn, user } })
  })
  await page.route('**/api/v1/auth/me', async (route) => {
    expect(route.request().headers().authorization).toBe('Bearer test-token')
    await route.fulfill({ json: user })
  })
}

async function signIn(page) {
  await page.goto('/login')
  await page.getByLabel('Email address').fill('elena@example.com')
  await page.getByLabel('Password *', { exact: true }).fill('TestPassword123!')
  await page.getByRole('button', { name: 'Sign In', exact: true }).click()
}

test('login updates the header, opens dashboard, and logout protects it again', async ({ page }) => {
  await mockLogin(page)
  await signIn(page)
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Your dashboard' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Elena Pop' })).toBeVisible()
  await expect(page.getByText('elena@example.com', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Logout' }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login$/)
})

test('invalid credentials keep the form open with an error', async ({ page }) => {
  await page.route('**/api/v1/auth/login', (route) =>
    route.fulfill({ status: 401, json: { status: 401, message: 'Invalid email or password.' } }),
  )
  await signIn(page)
  await expect(page.getByRole('status')).toHaveText('Invalid email or password.')
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeEnabled()
})

test('reload discards the in-memory token', async ({ page }) => {
  await mockLogin(page)
  await signIn(page)
  await expect(page).toHaveURL(/\/dashboard$/)
  await page.reload()
  await expect(page).toHaveURL(/\/login$/)
})

test('token expiry removes access to the dashboard', async ({ page }) => {
  await page.clock.install()
  await mockLogin(page)
  await signIn(page)
  await expect(page).toHaveURL(/\/dashboard$/)
  await page.clock.fastForward(900000)
  await expect(page).toHaveURL(/\/login$/)
})

test('network failure gives a retryable message', async ({ page }) => {
  await page.route('**/api/v1/auth/login', (route) => route.abort())
  await signIn(page)
  await expect(page.getByRole('status')).toHaveText('Unable to reach the server. Please try again.')
  await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeEnabled()
})
