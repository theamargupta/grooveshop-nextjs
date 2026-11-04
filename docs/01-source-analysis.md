# 01 — Source Analysis (verified from the cloned repo)

Cloned at `source-nuxt/` on 2026-11-04. All numbers below are counted, not guessed.

## What it actually is

- **Nuxt 4, multi-tenant SSR storefront** (not a toy). One build serves many stores;
  tenant resolved from request host; per-store designs under `app/components/variants/`.
- **Backend is a separate Django API** (`grooveshop-django-api`) — this repo only
  proxies to it through its Nitro server. Images come from a `media-stream` service;
  chat from an `agent-gateway`. **None of these backends are in the repo.**
- Redis per-store/per-language/per-device page caching; i18n (en-US, el-GR, …);
  auth via `nuxt-auth-utils`; state via Pinia; maps (maplibre), lottie, charts.

## Size (counted)

| Thing | Count |
|---|---|
| Vue components (`app/components`) | **613** |
| Pages/routes (`app/pages`) | **82** |
| Pinia stores | **11** |
| Test files (`test/`) | **881** |

## Existing tooling

- **Test:** Vitest 5 + `@vue/test-utils` + `@nuxt/test-utils` + happy-dom. E2E script present.
- **Types/contract:** OpenAPI schema shipped at `openapi/schema.json` + `schema.yml`,
  with an `openapi-ts` script → we can generate a **typed mock client** from it.
- Scripts: `build, dev, generate, lint, typecheck, test, test:e2e, test:coverage, trivy-scan`.

## The hard truth

- A **1:1 port of 613 components / 82 pages / 881 tests in a few days is impossible**,
  and the CTO explicitly said output completeness is not what's graded.
- The real backend (Django) is absent — any port must **mock the data layer**
  (best done from the shipped OpenAPI schema, so types stay honest).

→ Scope decision in `02-scope-and-approach.md`.
