# HANDOFF — resume the one-day build

A fresh session should read this + `docs/00`–`03`, `docs/plans/design-expand.md`, and
`docs/04-prompts-log.md`, then continue. Everything below is committed to `main` and deployed.

## Current state (live, verified)

- **Repo (public):** https://github.com/theamargupta/grooveshop-nextjs
- **Live app (public):** https://grooveshop-nextjs.vercel.app
- Next.js 16 + React 19 + TS + Tailwind v4, **restyled to match the GrooveShop demo**
  (lime `#D6F94A`, ink `#17171A`, Manrope; header, product cards with sale badge + wishlist
  heart + "+ Add" + orange stars, listing with filter sidebar + category pills-with-counts,
  detail, cart, checkout, success).
- **Product images:** illustrated SVGs (headphones/speaker/earbuds/watch/band/dock/hub/case),
  live and verified (no more "OP/SM" letters).
- **46 unit tests**, **89% coverage**, **Playwright E2E + video**, **security audit** (0 prod
  vulns, headers live) — all in `docs/reports/`.
- Agentic process + every prompt: `docs/04-prompts-log.md`.

## Remaining one-day work (plan: `docs/plans/design-expand.md`)

3 independent Codex/Sonnet lanes (file-disjoint), then images-done, then recording:
- **Lane A** — expand catalog to ~40 products across brands (add `brand`/`color` to `Product`,
  red tests first) + make brand/price/color filters actually work.
- **Lane B** — full homepage richness (dark hero, trust badges, categories, product rows,
  dark coupon section, loyalty, stats, blog teaser, testimonials, FAQ, rich footer).
- **Lane C** — dark mode toggle + functional wishlist.
- **Images** — already upgraded to illustrated SVGs; generate more as Lane A adds products
  (reuse `scratchpad/gen-svgs.mjs` approach, or extend the glyph set).
- **Recording** (`docs/plans/phase10-recording.md`) — 15-min automated screen capture +
  ElevenLabs voice (`ELEVENLABS_API_KEY` is in the env). The narration spine is the prompts log.

## Rules (unchanged)

Build-loop (Rule 0): worktree → spec → red test → code → gate → merge → deploy → verify.
Codex lanes for code (`bin/codex-lane.sh`), leader (Opus) reviews + merges + deploys. Keep all
tests green and accessible names stable (the E2E depends on them). One deploy per milestone.

## Final email

Draft ready at `.claude/messages/final-submission-email.md` (repo + live link). Amar sends it.
