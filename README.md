# GrooveShop — Nuxt → Next.js conversion

A production-quality conversion of the core commerce flow of the
[GrooveShop Nuxt storefront](https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt)
to **Next.js**, built with an agentic AI workflow and delivered with tests, coverage,
end-to-end video, and a security audit.

**Live demo:** https://grooveshop-nextjs.vercel.app

**Walkthrough video (16 min):** [`docs/recording/agentic-journey.mp4`](docs/recording/agentic-journey.mp4) —
a narrated tour of the agentic build: the scope decision, the build loop, the Opus-leader /
Codex-lane model mix, tests + coverage, the honest debugging beats (the next/image bug, the
license finding), the security audit, the production proof, and the demo-match iteration.
Narration script: [`docs/recording/narration.md`](docs/recording/narration.md); it is fully
reproducible via `scripts/tts.mjs` (ElevenLabs), `scripts/make-cards.mjs`,
`scripts/capture-app.mjs`, and `scripts/stitch.mjs` (ffmpeg).

> Take-home for Kombee (CTO round). The source is a Nuxt 4, multi-tenant, server-rendered
> storefront (~613 Vue components, 82 routes) whose data comes from a separate Django API.
> A full 1:1 port is neither feasible nor the point — this delivers a **complete vertical
> slice** done to a high standard, with the scope decided and stated openly.

## What's in scope (the slice)

Home → product listing (category + search filters) → product detail → cart → checkout → order
placed. Plus: responsive layout, loading/empty/error states, accessible markup, a typed mock
data layer generated from the project's own OpenAPI schema.

## Deliberately out of scope (and why)

Multi-tenant host resolution, the Redis SSR cache, the Django backend, maps, loyalty, gift
cards, and the blog. The real backend is not part of the repo, so data is a **mock layer** whose
shapes are an honest subset of `source-nuxt/openapi/schema.json`. Scope is a decision, not a gap.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Vitest + Testing Library ·
Playwright. No `any`, no silent failures; files kept small and single-responsibility.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Quality — the reports

| Area | Command | Report |
|---|---|---|
| Unit tests + coverage | `npm run test:coverage` | `docs/reports/coverage-summary.md` (81 tests, 87% on lib+components) |
| E2E (Playwright) + video | `npm run test:e2e` | `docs/reports/e2e-summary.md`, video in `docs/reports/e2e-video/` |
| Security audit | `npm audit` | `docs/reports/security-audit.md` (0 prod vulns, headers live) |

## How it was built — the agentic workflow

This repo was built with a disciplined build loop, narrated in `docs/04-prompts-log.md`:

1. **Docs-first + scope** — study the source, decide the slice (`docs/00`–`03`).
2. **Model mix** — specs, reviews and risky work on the strongest model; **code generation
   delegated to Codex** lanes, each phase gated before merge.
3. **Test-first** — every phase starts with a spec and a failing test, then code to green.
4. **Gated phases** — typecheck + lint + unit + build green before each merge to `main`.

Full process log and prompts: **`docs/04-prompts-log.md`**. Phase specs/plans: `docs/specs/`, `docs/plans/`.

## Project layout

```
src/lib/        mock data layer, cart logic, checkout validation, price formatting (unit-tested)
src/components/ presentational + client components (ProductCard, ProductGrid, filters, cart, header)
src/app/        App Router pages: home, /products, /products/[slug], /cart, /checkout, /checkout/success
e2e/            Playwright specs
docs/           brief, source analysis, scope, plan, prompts log, reports
```
