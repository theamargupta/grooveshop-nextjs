# 03 — Phased Plan (build-loop)

Each phase completes before the next: tests green, typecheck + lint clean, committed.
Every new/extended file stays under 200 lines (Rule 1).

| Phase | Work | Checkpoint (gate) |
|---|---|---|
| 0 | Email sent + repo studied + this docs/ bundle written | Docs committed; email approved by Amar |
| 1 | Next.js scaffold: App Router, TS, Tailwind v4, Vitest + coverage, Playwright | `pnpm test` runs; `playwright test --list` lists specs |
| 2 | Mock data layer generated from `openapi/schema.json` (products, cart, order) | Typed mock returns fixtures; unit test green |
| 3 | Home + Product listing (RSC fetch, grid, filter, search) | Renders real fixtures; typecheck clean |
| 4 | Product detail (gallery, price, add-to-cart) | Add-to-cart updates cart state; test green |
| 5 | Cart + Checkout (qty/remove, totals, place-order mock) | Full flow works locally; unit green |
| 6 | Unit tests + coverage to target (≥ ~80% of ported code) | `test:coverage` report saved to `docs/reports/` |
| 7 | Playwright E2E: browse → add → cart → checkout, **video on** | Video saved to `docs/reports/e2e-video/` |
| 8 | Security audit: `npm audit`, headers, XSS/sanitisation, env, dep scan | `docs/reports/security-audit.md` |
| 9 | README + prompts log finalised + reports bundle | All in repo |
| 10 | 15–20 min screen recording (agentic journey narration) | Recording ready |
| 11 | Push to **public GitHub repo** + send final email with URL | **Amar approves push/deploy** (Rule 10) |

## Lanes (Rule 0 step 4)

Independent, file-owned lanes after Phase 2:
- **Lane A:** Home + Listing (Phase 3)
- **Lane B:** Product detail (Phase 4)
- **Lane C:** Cart + Checkout (Phase 5)
Each in its own worktree; leader integrates on merged `main` and runs the full gate.

## Model mix (weekly budget tight)

- **Opus:** this plan, reviews, security audit, architecture calls.
- **Codex / Sonnet:** conversion code, components, test writing — inside lanes.
- Narrate this split in the video — "right model for the right job" is itself a CTO signal.

## Hard stops (never a fix)

Widening a timeout, a retry/sleep to pass, editing data to pass, `|| true`, swallowed
catch. A failing test that reflects a real bug → fix the app.
