import { expect } from '@playwright/test'

export async function expectSelectedFilters(page, category, host) {
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

