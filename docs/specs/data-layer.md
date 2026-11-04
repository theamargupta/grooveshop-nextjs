# Spec — mock data layer (from OpenAPI)

The real backend is a Django API not in this repo. This layer gives the storefront
a typed, in-memory mock whose shapes are an honest subset of the project's OpenAPI
schema (`source-nuxt/openapi/schema.json`: `Product`, `Cart`, `CartItem`).

## Domain types (`src/lib/types.ts`)

- `Product` — id, slug, name, description, price, finalPrice, priorPrice|null,
  discountPercent|null, image, stock, categorySlug, categoryName, reviewAverage,
  reviewCount, currency.
- `CartItem` — productId, slug, name, image, unitPrice, quantity, lineTotal.
- `Cart` — items[], totalItems, subtotal, currency.

## Product repository (`src/lib/data/products.ts`)

- `listProducts(opts?)` → `Product[]`
  - no opts → all active products (fixtures).
  - `{ category }` → only products whose `categorySlug === category`.
  - `{ search }` → products whose `name` contains `search` (case-insensitive).
  - category + search → both filters applied (AND).
  - unknown category / no match → `[]` (never throws — Rule 5).
- `getProductBySlug(slug)` → `Product | null` (null when not found).
- `listCategories()` → `{ slug, name }[]` unique, derived from fixtures.

## Fixtures (`src/lib/data/fixtures.ts`)

- At least 8 products across at least 2 categories, prices realistic, some with a
  `priorPrice` (on sale), at least one `stock === 0` (out of stock) for empty/edge UI.
- `currency` is `EUR` (the demo store).

## What it refuses to do

- No network, no env, no Django calls — pure in-memory, deterministic.
- Never throws on bad input; returns `[]` or `null`.

## Why

One data seam the whole slice imports (Rule 3: data layer separate from UI). When the
real API is wired later, only this file changes — pages and components stay put.
