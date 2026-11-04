# Plan — Phase 5: Cart page + Checkout

Spec: `docs/specs/checkout.md`. On main: cart-logic, cart-context (`useCart`), formatPrice,
ProductCard, data layer. Red test written and failing: `src/lib/checkout/validate.test.ts`.

## Phase 5.1 — checkout validation (pure)
Who: codex · high
Implement `src/lib/checkout/validate.ts` (export `CheckoutForm` type + `validateCheckout`) until
`src/lib/checkout/validate.test.ts` is green, without editing the test. Required fields,
whitespace-only = missing, email trimmed + format-checked, returns `{}` when valid, never throws.

## Phase 5.2 — cart + checkout + success pages
Who: codex · high
1. `src/app/cart/page.tsx` (`'use client'`, `useCart`) — line list (image, name→detail, unit price,
   qty stepper +/−, line total, remove), subtotal via `formatPrice`, "Proceed to checkout" → `/checkout`,
   empty state with "Browse products".
2. `src/app/checkout/page.tsx` (`'use client'`) — order summary from `useCart`; address form using
   `validateCheckout` (per-field errors on submit); empty cart → link back to products; on valid submit
   `clear()` then `router.push('/checkout/success')`.
3. `src/app/checkout/success/page.tsx` — "Order placed" + mock order ref + link home.
4. Add "Cart" + "Checkout" reachable from `SiteHeader` (cart badge already links to `/cart` if present;
   otherwise add a cart link). Do NOT break existing header tests.

## Done condition
```
npx vitest run                                   # all green (incl validate)
npx next typegen && npx tsc --noEmit             # clean
npx eslint src                                   # clean
npm run build                                    # succeeds (/cart, /checkout, /checkout/success present)
```

## Rules
- Do NOT edit test files or Phase 1-4 source under `src/lib/{types,data,cart,format-price}`.
- Keep the default `"build": "next build"` script (do NOT switch to --webpack).
- No `any`, no eslint-disable, no swallowed errors. localStorage guarded. Files < 200 lines. Commit on green; report SHA.
