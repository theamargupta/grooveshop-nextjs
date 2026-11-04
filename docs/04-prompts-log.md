# 04 — Prompts & Process Log (the graded artifact)

Append every meaningful prompt + what it produced, live, as the build runs. This is
what the CTO grades. Keep it clean — no previous-employer IP.

Format per entry:

```
### [Phase N] <short title> — <timestamp>
- Tool: Claude Code / Codex / Sonnet / Opus
- Goal: <one line>
- Prompt: <the exact prompt>
- Output: <what it produced — files, result>
- Gate: <typecheck/lint/unit/E2E result>
- Decision/learning: <why, trade-off>
```

---

### [Phase 0] Repo study + scope — 2026-11-04
- Tool: Claude Code (Opus)
- Goal: Understand the source and decide scope before any code.
- Output: Cloned `source-nuxt/`; counted 613 components / 82 pages / 881 tests;
  found OpenAPI schema; decided vertical-slice scope (see `02-scope-and-approach.md`).
- Decision: Full 1:1 port is infeasible and not what's graded → port core commerce
  flow with full pipeline + reports; mock data from OpenAPI schema.

### [Phase 1] Scaffold + test tooling + first TDD cycle — 2026-11-04
- Tool: Claude Code (Opus) — plan/setup; CLI for scaffold
- Goal: Stand up Next.js with a proven test pipeline, via one real red→green cycle.
- Steps: `create-next-app` (Next 16.4.5, React 19.3, TS, Tailwind 4, App Router, src-dir);
  added Vitest + Testing Library + Playwright + v8 coverage.
- Gotcha fixed: npm ERESOLVE — `@types/node@^20` (create-next-app) vs vitest/vite needing
  `@types/node` 22+/24+. Root fix: bumped `@types/node` to `^24` (matches Node v24 runtime).
  Source: the npm ERESOLVE peer-range output itself.
- TDD: wrote `docs/specs/price-format.md` → red test `format-price.test.ts` (suite red,
  module missing) → impl `format-price.ts` → **green, 5/5**.
- Vitest config from official Next.js docs:
  https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/testing/vitest.mdx
- Scripts: `test`, `test:run`, `test:coverage`, `test:e2e`.

### [Phase 2] Mock data layer — model mix (Opus spec, Codex impl) — 2026-11-04
- Contract by Opus: `docs/specs/data-layer.md`, `src/lib/types.ts`, 8 red tests
  `src/lib/data/products.test.ts` (red: `Failed to resolve import "./products"`).
- Handed to **Codex lane `gs-P2-data`** with `docs/plans/phase2-data.md` (Who: codex · high).
- Codex implemented `fixtures.ts` (140 lines, 8 products / 3 categories / sale + out-of-stock)
  + `products.ts` (listProducts/getProductBySlug/listCategories, pure, null-safe).
- Opus review + merge: re-ran outside Codex sandbox on merged `main` → **13 tests pass**, tsc clean.
- Gotcha: tsc scanned the cloned `source-nuxt/` → added it + `.claude/worktrees` to tsconfig `exclude`.

### [Phase 3] Home + Listing — Codex lane `gs-P3-listing` — 2026-11-04
- Opus contract: `docs/specs/listing.md` + red tests for `ProductCard` / `ProductGrid` (+ jest-dom setup).
- Codex built: product-card, product-grid, product-filters (client), home, `/products` listing,
  site-header, 8 placeholder SVGs.
- Review: Codex set `build --webpack` (its sandbox can't bind Turbopack's CSS port); reverted to
  default `next build` — Turbopack build verified clean on dev machine.
- Gate on merged main: 21 tests green, tsc+lint clean, build OK.

### [Phase 4] Cart logic + Product detail — Codex lane `gs-P4-detail` — 2026-11-04
- Opus contract: `docs/specs/cart-and-detail.md` + 9 red tests for pure `cart-logic`.
- Codex built: `cart-logic.ts` (pure), `cart-context.tsx` (localStorage, guarded), `add-to-cart.tsx`,
  cart-count badge, `/products/[slug]` detail page with `generateMetadata` + `notFound()`.
- Review: again reverted `--webpack` → Turbopack (sandbox note). Gate on main: 30 tests green,
  tsc+lint clean, build OK (`/products/[slug]` route present).

### [Phase 5] Cart page + Checkout — Codex lane `gs-P5-checkout` — 2026-11-04
- Opus contract: `docs/specs/checkout.md` + red tests for pure `validateCheckout`.
- Codex built: `validate.ts`, `/cart` (qty stepper, remove, subtotal, empty state), `/checkout`
  (order summary + validated address form + mock place-order → clear cart), `/checkout/success`.
- Codex **blocked on commit** (its sandbox can't run the Turbopack build to reach its done-gate),
  so the leader committed the work after verifying on the dev machine.
- Gate on merged main: 35 tests green, tsc+lint clean, build OK (`/cart`, `/checkout`, `/checkout/success`).

### [Phase 6] Unit coverage → 89% — Codex lane `gs-P6-coverage` — 2026-11-04
- Codex added Testing-Library tests for the uncovered client components + cart provider.
- Coverage (lib+components) 89.4/76.6/85.9/89.9, 46 tests; thresholds enforced in vitest config.
- Report: `docs/reports/coverage-summary.md`. Pages (RSC) excluded — covered by E2E.

### [Phase 7] Playwright E2E + video — leader (Opus) — 2026-11-04
- Opus wrote `playwright.config.ts` (`video: 'on'`, bundled headless chromium shell) + `e2e/shop-flow.spec.ts`.
- Ran against a prod build on dev machine (Codex sandbox can't run a browser). **2 specs pass.**
- Three *test* selector bugs fixed (cart eyebrow vs h1; `Address` also matched `Email address`;
  success text ×3) — app behaviour was correct. Video: `docs/reports/e2e-video/full-purchase-flow.webm`.

<!-- next entries appended during the build -->





### [Phase 8] Security audit — leader (Opus) — 2026-11-04
- `npm audit`: 0 prod vulnerabilities; 16 dev-only moderate (not shipped). No `dangerouslySetInnerHTML`/`eval`/`process.env` in src.
- Added 5 baseline security headers in `next.config.ts`; VERIFIED live via `curl -sI` on a prod build.
- Report: `docs/reports/security-audit.md` (incl. CSP-with-nonce as documented follow-up).
