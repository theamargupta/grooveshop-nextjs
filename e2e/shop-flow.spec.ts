import { test, expect } from '@playwright/test'

const PRODUCT = 'Orbit Pro Headphones' // from src/lib/data/fixtures.ts

test('browse → product → add to cart → cart → checkout → order placed', async ({ page }) => {
  // Home
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  // Listing
  await page.goto('/products')
  await expect(page.getByRole('link', { name: PRODUCT })).toBeVisible()

  // Detail
  await page.getByRole('link', { name: PRODUCT }).first().click()
  await expect(page).toHaveURL(/\/products\/orbit-pro-headphones$/)
  await expect(page.getByRole('heading', { name: PRODUCT })).toBeVisible()

  // Add to cart
  await page.getByRole('button', { name: /add to cart/i }).click()

  // Cart — a non-empty cart shows the product line, subtotal, and the checkout CTA
  await page.goto('/cart')
  await expect(page.getByText(PRODUCT).first()).toBeVisible()
  await expect(page.getByText(/subtotal/i)).toBeVisible()
  const proceed = page.getByRole('link', { name: /proceed to checkout/i })
  await expect(proceed).toBeVisible()

  // Checkout
  await proceed.click()
  await expect(page).toHaveURL(/\/checkout$/)

  await page.getByLabel('Full name').fill('Amar Gupta')
  await page.getByLabel('Email address').fill('amar@example.com')
  await page.getByLabel('Address', { exact: true }).fill('12 High Street')
  await page.getByLabel('City').fill('Athens')
  await page.getByLabel('Postal code').fill('10431')
  await page.getByLabel('Country').fill('Greece')

  await page.getByRole('button', { name: /place order/i }).click()

  // Success
  await expect(page).toHaveURL(/\/checkout\/success$/)
  await expect(page.getByText(/order (placed|confirmed)/i).first()).toBeVisible()
  await expect(page.getByText(/order reference/i).first()).toBeVisible()
})

test('checkout rejects an empty form (stays on /checkout with errors)', async ({ page }) => {
  // put something in the cart first
  await page.goto('/products/orbit-pro-headphones')
  await page.getByRole('button', { name: /add to cart/i }).click()

  await page.goto('/checkout')
  await page.getByRole('button', { name: /place order/i }).click()

  // did NOT navigate to success; the form is still shown
  await expect(page).toHaveURL(/\/checkout$/)
  await expect(page.getByRole('button', { name: /place order/i })).toBeVisible()
})
