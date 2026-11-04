# Plan — Phase 2: mock data layer

Spec: `docs/specs/data-layer.md`. Types already written: `src/lib/types.ts`.
Red test already written and failing for the right reason: `src/lib/data/products.test.ts`
(fails: `Failed to resolve import "./products"`).

## Phase 2.1 — product repository + fixtures
Who: codex · high

Implement, until the red test goes green, without changing the test or the types:

1. `src/lib/data/fixtures.ts`
   - Export `products: Product[]` with **at least 8** realistic products across
     **at least 2** categories (e.g. `audio`, `wearables`, `accessories`).
   - Fields must satisfy the spec: valid `slug` (kebab), `name`, `description`,
     `price`, `finalPrice`, `priorPrice` (set on at least one so `priorPrice > finalPrice`),
     `discountPercent` matching when on sale else null, `image` (use `/products/<slug>.svg`
     placeholder paths — do NOT invent remote URLs), `stock` (**at least one `stock === 0`**),
     `categorySlug`, `categoryName`, `reviewAverage` (0–5), `reviewCount`, `currency: 'EUR'`.
   - Keep the file under 200 lines (Rule 1). If it would exceed, split per category
     into `fixtures/<category>.ts` and re-export.

2. `src/lib/data/products.ts`
   - `listProducts(opts?: ListProductsOptions): Product[]` — all by default; filter by
     `categorySlug === opts.category`; filter by `name` containing `opts.search`
     (case-insensitive); both applied together; `[]` on no match; never throws.
   - `getProductBySlug(slug: string): Product | null`.
   - `listCategories(): Category[]` — unique `{slug,name}` derived from fixtures, stable order.
   - Pure, synchronous, deterministic. No network/env.

## Done condition (run both, both must pass)

```
npx vitest run src/lib/data/products.test.ts    # all green
npx next typegen && npx tsc --noEmit             # clean
```

## Rules
- Do NOT edit `src/lib/data/products.test.ts` or `src/lib/types.ts`.
- No `any`. No eslint-disable. No swallowed errors.
- Commit on green with a clear message; report the SHA to the leader.
