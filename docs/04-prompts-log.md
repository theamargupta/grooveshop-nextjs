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

<!-- next entries appended during the build -->


