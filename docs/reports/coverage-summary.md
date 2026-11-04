# Coverage Report — unit tests

Generated with Vitest + v8 (`npm run test:coverage`). Full HTML report is regenerated
into `docs/reports/coverage/` (git-ignored, reproducible). Numbers below are from
`main` after Phase 6.

## Totals (unit-testable surface: `src/lib/**` + `src/components/**`)

| Metric | % | Threshold |
|---|---|---|
| Statements | **89.40** | 80 |
| Branches | **76.63** | 75 |
| Functions | **85.93** | 80 |
| Lines | **89.85** | 80 |

**46 unit tests, all passing.**

## What is measured, and what is not

- **Measured:** pure logic (`cart-logic`, `products`, `checkout/validate`, `format-price`)
  and components (`product-card`, `product-grid`, `product-filters`, `add-to-cart`,
  `cart-count-badge`, `site-header`, `cart-context`).
- **Deliberately excluded:** route files under `src/app/**` (Server/Client *pages*).
  These are integration surfaces best verified end-to-end; they are covered by the
  Playwright E2E suite (see `docs/reports/` and Phase 7), not by unit tests. Counting
  them under unit coverage would only deflate the number with code unit tests should
  not be asserting.

## How to reproduce

```bash
npm run test:coverage      # prints the table and writes docs/reports/coverage/index.html
```
