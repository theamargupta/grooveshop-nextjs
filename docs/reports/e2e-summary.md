# E2E Report — Playwright

Run with Playwright (bundled headless chromium shell) against a production build
(`npm run build && next start`). Config: `playwright.config.ts` (`video: 'on'`).

## Result: 2 passed / 0 failed

| Test | What it proves |
|---|---|
| `browse → product → add to cart → cart → checkout → order placed` | The full purchase flow end-to-end: home → listing → product detail → add to cart → cart line + subtotal → checkout form (validated) → order placed success with an order reference. Each step is asserted (URL + visible content), not just "no error". |
| `checkout rejects an empty form` | Submitting checkout with an empty form stays on `/checkout` (does not reach success) — validation is enforced in the UI. |

## Video

- `docs/reports/e2e-video/full-purchase-flow.webm` — the recorded happy-path run.
- Raw per-test artifacts and the HTML report are regenerated into
  `docs/reports/e2e-artifacts/` and `docs/reports/playwright-report/` (git-ignored).

## Reproduce

```bash
npx playwright install chromium   # once
npm run test:e2e                  # runs both specs, records video
npx playwright show-report docs/reports/playwright-report
```

## Debugging notes (honest trail)

The happy-path spec took three selector fixes before green — each a *test* bug, not an app bug:
the cart heading was an eyebrow label not an `<h1>`; `getByLabel('Address')` also matched
"Email address" (fixed with `exact`); the success text appeared 3× (fixed with `.first()`).
The app behaviour was correct throughout.
