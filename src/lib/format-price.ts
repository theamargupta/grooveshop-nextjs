// Single source of price formatting for the storefront (Rule 4: one place to change).
// Spec: docs/specs/price-format.md

const DEFAULT_CURRENCY = 'EUR'
const LOCALE = 'en-US'

/**
 * Formats a monetary amount for display, e.g. `formatPrice(19.99)` -> "€19.99".
 * Invalid input (NaN, non-finite, null, undefined) returns "—" instead of throwing (Rule 5).
 */
export function formatPrice(amount: number, currency: string = DEFAULT_CURRENCY): string {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return '—'
  }
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
