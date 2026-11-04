# 02 — Scope & Approach

## The decision

Port a **high-quality vertical slice** of the storefront — the core commerce flow —
to Next.js, done end-to-end with the full agentic pipeline, tests, coverage, E2E
video, and security audit. **Not** a 613-component 1:1 port. Scoping deliberately
*is* the senior signal the CTO wants to see.

### In scope (the slice)

- **Home / landing** (hero, featured products)
- **Product listing** (grid, category filter, search box)
- **Product detail** (gallery, price, add-to-cart)
- **Cart** (add / update qty / remove, totals)
- **Checkout** (address + summary form, place-order — mocked)
- Cross-cutting: i18n (en-US at least), responsive, loading/empty/error states.

### Out of scope (state it openly in the README — this is maturity, not a gap)

- Multi-tenant host resolution, per-store variant designs
- Redis SSR cache, Django API (replaced by a **mock layer from the OpenAPI schema**)
- Maps, lottie, charts, loyalty program, gift cards, blog, newsletter, account/auth depth

## Target stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | What CTO asked; RSC story to narrate |
| Styling | **Tailwind v4** | Nuxt app already uses Tailwind — closest mapping |
| UI | shadcn/ui (as needed) | Fast, own-the-source components |
| Data | **Mock client generated from `openapi/schema.json`** | Honest types, no real backend |
| State | React Server Components + minimal client state (cart) | Show RSC/client split on purpose |
| Unit | **Vitest + Testing Library** | Mirrors their Vitest choice |
| E2E | **Playwright** (video on) | CTO asked for video |
| Security | `npm audit` + headers + XSS/DOMPurify + env audit + Trivy-style dep scan | Report in `docs/` |

## The real product: the agentic journey

The CTO described his dream workflow — "Friday plan → Monday report card, no human
intervention." That is literally Amar's **build-loop + lanes + worktree + Codex/Sonnet/Opus
mix**. So the win is to *run and narrate that real pipeline*, not invent one.

- **Build-loop (Rule 0):** docs-first → research → spec → phased plan → tests-first → implement → prove on deployed app.
- **Lanes:** split the slice into parallel worktrees (route groups), each a peer session; Codex writes code, Claude writes specs/tests/reviews, Opus for plan+review+security.
- **Proof:** every phase gated by typecheck + lint + unit + E2E; final flow driven on the deployed app with Playwright.
- **Prompts log** (`04-prompts-log.md`) captures every prompt live — the graded artifact.
