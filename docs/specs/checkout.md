# Spec — Cart page + Checkout (Phase 5)

## Checkout validation (`src/lib/checkout/validate.ts`) — pure
- `CheckoutForm` type: `fullName, email, address, city, postalCode, country` (all strings).
- `validateCheckout(form)` → `Partial<Record<keyof CheckoutForm, string>>` (field → error message).
  - every field required (whitespace-only counts as missing).
  - `email` must be a valid email (trim first; a trimmed valid email passes).
  - returns `{}` when all good. Never throws.

## Cart page (`src/app/cart/page.tsx`) — client (`useCart`)
- Lists each line: image, name (link to detail), unit price, quantity stepper (+/−), line total, remove.
- `+`/`−` call `updateItem`; `−` at qty 1 removes (via cart-logic).
- Shows subtotal via `formatPrice`; "Proceed to checkout" link to `/checkout`.
- Empty cart → friendly empty state with a "Browse products" link (no crash).

## Checkout page (`src/app/checkout/page.tsx`) — client
- Order summary (items + subtotal from `useCart`).
- Address form bound to `validateCheckout`; show per-field errors on submit.
- Empty cart → redirect/link back to products (cannot checkout nothing).
- On valid submit: `clear()` the cart and go to `/checkout/success` (mock — no payment).

## Success (`src/app/checkout/success/page.tsx`)
- "Order placed" confirmation + a mock order reference + link back to home.

## What it refuses to do
- No real payment, no network. Validation is pure and total (never throws).

## Why
Validation is the one piece of checkout worth unit-testing; the rest is wiring proven by E2E (Phase 7).
