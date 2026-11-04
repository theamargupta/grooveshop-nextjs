# Plan — Phase 3: Home + Product Listing

Spec: `docs/specs/listing.md`. Data layer (Phase 2) is on main: `listProducts`,
`getProductBySlug`, `listCategories`, `formatPrice`. Red tests already written and failing:
`src/components/product-card.test.tsx`, `src/components/product-grid.test.tsx`.

## Phase 3.1 — components + pages + placeholder images
Who: codex · high

Implement until the two red component tests go green, without editing the tests:

1. `public/products/<slug>.svg` for every fixture product (import `products` from
   `src/lib/data/fixtures.ts` to get the exact slugs). Simple distinct SVG: a solid
   background colour + the product's initials, 600x600. No remote URLs.
2. `src/components/product-card.tsx` — presentational (no fetch). Per spec: name as a
   `next/link` to `/products/<slug>`, `next/image` with `alt={name}`, `formatPrice(finalPrice, currency)`,
   struck prior price + `-NN%` badge when on sale, "Out of stock" when `stock===0`, review summary.
3. `src/components/product-grid.tsx` — responsive Tailwind grid of `ProductCard`;
   empty state with visible text "No products found".
4. `src/components/product-filters.tsx` — `'use client'`; category pills (from `listCategories()`)
   and a search input that pushes to the URL query (`?category=&q=`) with `useRouter`/`useSearchParams`.
5. `src/app/page.tsx` (Home) — hero + "Featured" `ProductGrid` of first 4 of `listProducts()`.
6. `src/app/products/page.tsx` (Listing, Server Component) — `await searchParams`
   (Next 16: it is a Promise), render `ProductFilters` + `ProductGrid` with
   `listProducts({ category, search })`.
7. A minimal shared header/nav (`src/components/site-header.tsx`) with links to Home and Products,
   wired into `src/app/layout.tsx`. Keep it small.

## Design
Clean, modern storefront: neutral palette, generous spacing, rounded cards, subtle shadow,
clear typographic hierarchy. Tailwind v4 (CSS-first; no `tailwind.config.js`). Mobile-first,
no horizontal scroll at 390px. Accessible: real `alt`, focus states, semantic landmarks.

## Done condition
```
npx vitest run src/components/product-card.test.tsx src/components/product-grid.test.tsx   # green
npx next typegen && npx tsc --noEmit                                                        # clean
npx eslint src/components src/app                                                           # clean
npm run build                                                                              # succeeds
```

## Rules
- Do NOT edit the test files or `src/lib/*`. No `any`, no eslint-disable, no swallowed errors.
- Every new file < 200 lines (Rule 1). Commit on green; report SHA.
