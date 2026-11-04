# Plan — One-day lanes to demo fidelity (verified against code 2026-11-04)

Base: `main` @ `a52b4fe`. Reference demo: https://demo.grooveshop.space. Tokens lime `#D6F94A`,
ink `#17171A`, Manrope, Tailwind v4 CSS-first (`src/app/globals.css`). Spec: `docs/specs/design-match.md`.

**Lanes:** A, B, C — launched at once (file-disjoint, verified below). Each is a Codex lane
(`bin/codex-lane.sh`, `codex · high`); leader (Opus) reviews + merges + runs gate on merged `main` +
deploys once at the end. Merge order A → B → C.

**Codex: all three build phases** — red tests already specified here, done condition is the gate command.

## File ownership (verified — zero overlap)

| Lane | Owns (edits/creates) |
|---|---|
| A | `src/lib/types.ts`, `src/lib/data/fixtures.ts`, `src/lib/data/products.ts`, `src/lib/data/products.test.ts`, `src/components/product-filters.tsx`, `src/components/product-filters.test.tsx`, `src/components/product-sidebar.tsx`, `src/components/product-sidebar.test.tsx` (new), `src/app/products/page.tsx` |
| B | `src/app/page.tsx`, `src/components/home-showcase.tsx`, new `src/components/home-*.tsx`, new `src/components/site-footer.tsx` (+ its test) |
| C | `src/app/layout.tsx`, `src/app/globals.css`, new `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`, `src/lib/wishlist/wishlist-context.tsx` (+ test), `src/lib/wishlist/wishlist-logic.ts` (+ test), `src/components/site-header.tsx`, `src/components/product-card.tsx` |

Shared contract A→B/C: A adds **required** fields to `Product` and updates all 8 existing fixtures in the
same change, so the repo always compiles. Nobody else edits `types.ts`.

## Hard rules (all lanes)
- Behaviour + **accessible names unchanged**: "Add to cart", field labels, "Proceed to checkout",
  "Place order", "Search products", "Wishlist". E2E `e2e/shop-flow.spec.ts` must stay green; if a visible
  label changes, update the spec in the SAME change.
- Red test FIRST, watch it fail for the right reason, then implement. No `any`, no `eslint-disable`.
  Every file < 200 lines (Rule 1) — split sections into separate components.
- Gate per lane: `npx vitest run` (green, incl. new tests) + `npx tsc --noEmit` + `npx eslint .` +
  `npx next build`. Report the SHA to the leader; never push (leader pushes).

---

## Lane A — Catalog depth + working filters  (codex · high)

### Spec
`Product` gains `brand: string`, `brandSlug: string`, `color: string`, `colorHex: string` (all required;
set on every fixture). Catalog grows to **~40 products** across 4 brands (Groove, Kabelo, Nexis, Voltra)
and the 3 existing categories (Audio, Wearables, Accessories) plus keep sale/`priorPrice` on ~1/3 and
**exactly one out-of-stock per category**. Filters in the left sidebar become real and URL-driven:
`brand`, `color`, `minPrice`, `maxPrice`, alongside existing `category` + `q`.

### Phase A1 — red tests for the data layer
Who: codex · high
Extend `src/lib/data/products.test.ts` (keep existing tests green):
- `filters by brand` — `listProducts({ brand: <slug> })` returns only that brand.
- `filters by color` — `listProducts({ color: <name> })` returns only that color.
- `filters by price range` — `listProducts({ minPrice, maxPrice })` returns only products whose
  `finalPrice` is within [min,max] inclusive.
- `combines filters` — category + brand + price together.
- `lists all brands` — new `listBrands()` returns `{slug,name}[]` with >= 4 entries, deduped.
- `lists all colors` — new `listColors()` returns `{name,hex}[]` deduped.
- Bump the "lists all products" assertion to `>= 36`.
Run `npx vitest run src/lib/data` -> MUST be red (functions/fields don't exist). Record the failure line.

### Phase A2 — implement data layer
Who: codex · high
- Extend `ListProductsOptions` with `brand?`, `color?`, `minPrice?`, `maxPrice?` (all optional).
- `listProducts` filters additively; ignore `undefined`/`NaN` bounds.
- Add `listBrands()` and `listColors()` to `products.ts`.
- Grow `fixtures.ts` to ~40 products (ids unique, slugs unique, every field present). Keep the 8 existing
  verbatim and ADD brand/brandSlug/color/colorHex to them too. Image path `/products/<slug>.svg` for each
  new one (leader generates the SVGs after merge — the files may not exist yet; that's fine for unit/tsc).
- Gate green -> done.

### Phase A3 — wire the sidebar + page
Who: codex · high
- `src/app/products/page.tsx`: read `brand`, `color`, `minPrice`, `maxPrice` from `searchParams`
  (reuse `firstValue`), pass to `listProducts`; pass `brands`/`colors` (with counts) to the sidebar.
- `src/components/product-sidebar.tsx`: replace the hardcoded `Groove/Pulse/Orbit` list and static price
  bar with real, URL-driven controls — brand checkboxes/links, color swatches, a price min/max. Make it a
  client component (or a small client child) that pushes to the URL like `product-filters.tsx` does
  (`usePathname`/`useRouter`/`useSearchParams`). Keep `aria-label="Product filters sidebar"`.
- Add `src/components/product-sidebar.test.tsx`: renders brand options from props, a selected brand
  reflects the `brand` search param. Red first.
- Gate green (vitest + tsc + eslint + build) -> report SHA.

---

## Lane B — Full homepage richness  (codex · high)

### Spec
Rebuild the homepage to match the demo as small (<200-line) presentational components, composed in
`src/app/page.tsx`. Sections, in order: dark rounded **hero** (headline + lime primary CTA "Shop now" +
outline CTA + product image + floating stat chip), **trust-badges** row, **shop-by-category** tiles,
**new-arrivals** row + **popular** row (reuse `ProductCard`), dark **coupon** section (3 code chips),
**loyalty** band, **stats** row, **blog teaser** (static 3 cards), **testimonials** (static 3),
**FAQ accordion** (toggle), rich **footer** (`site-footer.tsx`, columns + newsletter input + social).

### Phases (B1–B3)
Who: codex · high
- **B1 — red test** for the only logic: FAQ accordion. `home-faq.test.tsx` (RTL): clicking a question
  reveals its answer, a second click hides it; use `getByRole('button', { name: ... })`. Red first.
- **B2 — build sections** as `src/components/home-*.tsx` (hero, trust, categories, product-row [takes
  `title` + `products`], coupon, loyalty, stats, blog, testimonials, faq) + `site-footer.tsx`. Replace
  `home-showcase.tsx` usage; `page.tsx` fetches `listProducts()` and slices rows (new-arrivals = first N,
  popular = highest `reviewCount`). Render `<SiteFooter/>` at the end of `page.tsx`.
- **B3 — gate** green (vitest incl. FAQ test, tsc, eslint, build) -> report SHA.
- Keep all existing links/labels. Do NOT edit `layout.tsx`, `site-header.tsx`, `globals.css`,
  `product-card.tsx` (Lane C owns those).

---

## Lane C — Dark mode + functional wishlist  (codex · high)

### Spec
A light/dark/system theme toggle in the header (class strategy on `<html>`, persisted), with dark token
variants in `globals.css`. A real wishlist: context over `localStorage` (guarded), heart toggle on
`product-card.tsx` and the header `Wishlist` link shows a live count.

### Phases (C1–C4)
Who: codex · high
- **C1 — red tests FIRST** (pure logic + context, no server):
  - `src/lib/wishlist/wishlist-logic.test.ts`: `toggle(ids, id)` adds then removes; `has(ids, id)`.
  - `src/lib/wishlist/wishlist-context.test.tsx`: provider persists to `localStorage` (mock), survives
    remount, guarded against throwing storage. Red first.
- **C2 — theme**: `theme-provider.tsx` (light/dark/system; sets `class="dark"` on `<html>`; persists to
  `localStorage`; no hydration flash — inline script or `suppressHydrationWarning`), `theme-toggle.tsx`
  (accessible button, `aria-label="Toggle theme"`), add dark `:root`/`.dark` variants in `globals.css`
  (background/foreground/surface/line/muted). Wrap app in `layout.tsx`.
- **C3 — wishlist**: `wishlist-context.tsx` provider in `layout.tsx`; `product-card.tsx` heart calls
  toggle and reflects state (`aria-pressed`, keep `aria-label="Add <name> to wishlist"`); header
  `Wishlist` link shows count badge. Keep `site-header.tsx` accessible names.
- **C4 — gate** green (vitest incl. wishlist tests, tsc, eslint, build) -> report SHA.
- `next-themes` is allowed IF already a dep; otherwise hand-roll (do not add deps without telling leader).
- Do NOT edit `page.tsx`, `home-*.tsx`, data layer, `products/page.tsx` (Lanes A/B own those).

---

## Leader tasks (after lanes)
1. Merge A -> run gate on merged `main` -> generate the ~32 new product SVGs (extend the gradient+glyph
   approach used for the existing 8; script in `scratchpad/`) -> place at `public/products/<slug>.svg`.
2. Merge B -> gate. Merge C -> gate on merged `main` (full `npx vitest run` + `npx playwright test` + build).
3. Screenshot-compare every page vs the demo; iterate. Deploy once (confirm with Amar). Step 8: drive the
   deployed app, verify the cart/checkout flow + filters + dark toggle + wishlist on prod.
4. Then Phase 10b recording (`docs/plans/phase10-recording.md`).
</content>
