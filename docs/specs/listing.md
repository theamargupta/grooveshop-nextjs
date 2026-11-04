# Spec — Home + Product Listing (Phase 3)

## Shared presentational components (reused by detail & cart later)

### `ProductCard` (`src/components/product-card.tsx`) — presentational, no fetching
Props: `{ product: Product }`. Renders:
- product `name` (as a link to `/products/<slug>`)
- `image` via `next/image` with meaningful `alt` (the name)
- price via `formatPrice(finalPrice, currency)`
- when on sale (`priorPrice` set and `> finalPrice`): show the struck-through `formatPrice(priorPrice)` and a discount badge `-NN%`
- when `stock === 0`: show an "Out of stock" label and mark the card accordingly
- review summary: `reviewAverage` and `reviewCount`

### `ProductGrid` (`src/components/product-grid.tsx`) — presentational
Props: `{ products: Product[] }`.
- renders one `ProductCard` per product in a responsive grid
- empty input → an empty state: visible text "No products found" (no crash — Rule 5)

## Pages (Server Components)

### Home (`src/app/page.tsx`)
- hero section + a "Featured" `ProductGrid` of the first ~4 products from `listProducts()`.

### Listing (`src/app/products/page.tsx`)
- reads `searchParams` (`category`, `q`) — Next 16: `searchParams` is a Promise, `await` it.
- category filter (links/pills from `listCategories()`) and a search box (client component
  `src/components/product-filters.tsx` that updates the URL query).
- renders `ProductGrid` with `listProducts({ category, search })`.
- handles empty result via `ProductGrid`'s empty state.

## Placeholder images
- `public/products/<slug>.svg` for every fixture product: a simple, distinct SVG
  (solid background + product initial/name). No remote URLs.

## What it refuses to do
- No data fetching inside `ProductCard`/`ProductGrid` (Rule 3 — they only render props).
- No crash on empty/era values; `formatPrice` already guards bad numbers.

## Why
`ProductCard` is the single product visual reused on listing, detail and cart. One
component, changed in one place (Rule 4).
