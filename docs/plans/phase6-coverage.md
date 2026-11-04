# Plan — Phase 6: raise unit coverage to threshold

Coverage is configured (vitest.config.mts) over `src/lib/**` + `src/components/**` with
thresholds 80/75/80/80. Current: ~40%. Covered well: cart-logic, products, validate,
format-price, product-card, product-grid. **Uncovered (0%):** `add-to-cart.tsx`,
`cart-count-badge.tsx`, `product-filters.tsx`, `site-header.tsx`, `cart-context.tsx`.

## Phase 6.1 — component + provider tests
Who: codex · high
Add Testing-Library tests (new `*.test.tsx` files beside each component) until
`npm run test:coverage` passes its thresholds, WITHOUT changing component behaviour:

1. `cart-context.test.tsx` — render a tiny probe component inside `<CartProvider>`; assert
   `addItem` adds + increments, `updateItem` changes qty / removes at 0, `removeItem` removes,
   `clear` empties; assert it survives a thrown `localStorage` (mock `window.localStorage` to throw).
2. `add-to-cart.test.tsx` — wrapped in `<CartProvider>`: clicking adds the product (cart count/state
   reflects it); disabled + "Out of stock" when `stock===0`.
3. `cart-count-badge.test.tsx` — shows the total item count from the cart (0 when empty, N after adds).
4. `product-filters.test.tsx` — mock `next/navigation` (`useRouter`, `useSearchParams`, `usePathname`);
   assert selecting a category pill / typing search pushes the expected `?category=`/`?q=` URL.
5. `site-header.test.tsx` — renders nav links (Home, Products, Cart). Wrap in `<CartProvider>` if needed.

## Done condition
```
npm run test:coverage      # exits 0 (all thresholds met: 80/75/80/80)
npx tsc --noEmit           # clean (run `npx next typegen` first)
npx eslint src             # clean
```

## Rules
- Tests ONLY. Do not change component/source behaviour. Prefer queries by role/text/label;
  add a `data-testid` only if there is genuinely no accessible handle.
- Mock `next/navigation` and `next/image` as needed in tests; never edit the components to suit tests.
- No `any`, no eslint-disable. Commit on green; report SHA.
