# Plan — Phase 4: Cart logic + Product Detail

Spec: `docs/specs/cart-and-detail.md`. On main: data layer, `formatPrice`, `ProductCard`,
`ProductGrid`, `SiteHeader`. Red test written and failing: `src/lib/cart/cart-logic.test.ts`
(`Failed to resolve import "./cart-logic"`).

## Phase 4.1 — pure cart logic
Who: codex · high
Implement `src/lib/cart/cart-logic.ts` until `src/lib/cart/cart-logic.test.ts` is green,
without editing the test. Pure functions: `emptyCart`, `addToCart`, `updateQuantity`,
`removeFromCart`. Each returns a NEW cart with correct `lineTotal`, `subtotal`, `totalItems`.
Clamp add-qty to ≥1; `updateQuantity<=0` removes; never mutate input; never throw on unknown id.

## Phase 4.2 — cart provider + detail page + add-to-cart
Who: codex · high
1. `src/lib/cart/cart-context.tsx` (`'use client'`) — context over the pure logic, persisted to
   `localStorage` key `grooveshop-cart` (every read/write in try/catch). `useCart()` → `{ cart,
   addItem, updateItem, removeItem, clear }`. Mount `<CartProvider>` in `src/app/layout.tsx`.
2. `src/components/add-to-cart.tsx` (`'use client'`) — button calling `useCart().addItem(product)`;
   disabled + "Out of stock" when `stock === 0`; shows brief "Added" feedback.
3. `src/app/products/[slug]/page.tsx` (Server Component) — `await params`; `getProductBySlug`;
   `notFound()` if null; render image/name/price/sale/description/stock/reviews + `<AddToCart>`.
   Add `generateMetadata` setting `<title>` to the product name.
4. Show a cart count badge in `SiteHeader` (make header read `useCart()` — convert to client or add a
   small client sub-component; keep SiteHeader's existing links). Do NOT break its Phase 3 tests.

## Done condition
```
npx vitest run                                   # all green (incl cart-logic)
npx next typegen && npx tsc --noEmit             # clean
npx eslint src                                   # clean
npm run build                                    # succeeds
```

## Rules
- Do NOT edit test files or Phase 1-3 source under `src/lib/{types,data}`, `src/lib/format-price.ts`,
  `product-card.tsx`, `product-grid.tsx`. No `any`, no eslint-disable, no swallowed errors.
- `localStorage` access always guarded. Every new file < 200 lines. Commit on green; report SHA.
