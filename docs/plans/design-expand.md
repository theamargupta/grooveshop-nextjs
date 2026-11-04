# Plan — Design expand to full demo fidelity (handoff)

Base restyle (tokens lime `#D6F94A` / ink `#17171A`, Manrope, restyled header/card/pages) is on
`main`. Spec: `docs/specs/design-match.md`. Reference: https://demo.grooveshop.space.
Content stays English; **design matches the demo**. All 46 unit tests + both E2E specs stay green;
accessible names unchanged (Add to cart, field labels, Proceed to checkout, Place order, etc).

Amar's 4 locked choices (all high-fidelity): full rich homepage · realistic product images ·
~40–50 products + real brand/price/color filters · dark mode + functional wishlist.

## Lanes (split by file ownership; each a whole phase with its own gate)

### Lane A — Catalog depth + working filters  (independent)
Who: sonnet · high · owns `src/lib/data/**`, `product-filters.tsx`, `product-sidebar.tsx`, `/products/page.tsx`
- Expand fixtures to ~40–50 products across 4 brands (Groove/Kabelo/Nexis/Voltra) and real
  categories, with `brand` + `color` fields (extend `Product` type). Keep `priorPrice`/sale + one
  out-of-stock per category.
- Make brand, price-range and color filters in the left sidebar actually filter (URL params),
  alongside the existing category + search. Red tests FIRST for the new filter logic in `src/lib/data`.
- Gate: `npx vitest run` green (new filter tests), tsc, eslint, build.

### Lane B — Full homepage richness  (independent)
Who: sonnet · high · owns `src/app/page.tsx`, `src/components/home-*.tsx`, new section components, footer
- Build the demo's homepage sections as small components (<200 lines each): dark rounded hero
  (headline + lime CTA + outline CTA + product image + floating chip), trust-badges row,
  shop-by-category tiles, new-arrivals + popular rows, dark coupon section (3 code chips),
  loyalty band, stats row, blog teaser (static), testimonials (static), FAQ accordion, rich footer.
- Pure presentational; a couple of RTL tests for any component with logic (FAQ toggle).

### Lane C — Dark mode + wishlist  (independent)
Who: sonnet · high · owns `theme` provider, `wishlist` context, `site-header.tsx` toggle, heart buttons
- `next-themes`-style light/dark/system toggle in the header; tokens already theme-able in globals.css —
  add the dark variants. Wishlist context (localStorage, guarded) + heart toggle on product cards and a
  `/wishlist` count in the header. Red tests FIRST for wishlist logic (add/remove/persist).
- Gate: vitest green, tsc, eslint, build.

### Realistic images  (leader task, after Lane A sets the catalog)
- Generate ~40–50 realistic product images (one per fixture) and place at `public/products/<slug>.*`.
  Use an image model; keep `dangerouslyAllowSVG` only if any stay SVG. The leader runs this on the dev
  machine, then re-deploys.

## Integration & review (leader)
- Lanes are file-disjoint → launch A, B, C at once. Leader merges each on green, runs the full gate on
  merged `main`, deploys, and **screenshot-compares every page against the demo**, iterating until the
  look matches. Then: realistic images, final deploy, then the Phase 10b recording.

## Hard rules
- Behaviour + accessible names unchanged; update `e2e/shop-flow.spec.ts` in the SAME change if a visible
  label changes, and keep it green. Tailwind v4 CSS-first. No `any`, no eslint-disable. Files < 200 lines.
