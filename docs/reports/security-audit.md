# Security Audit — grooveshop-nextjs

Date: 2026-11-04. Scope: the converted Next.js storefront slice (this repo). The real
backend (Django API) is out of scope — this app ships a mock data layer with no network,
no database, and no authentication surface.

## 1. Dependency vulnerabilities (`npm audit`)

- **Production dependencies: 0 vulnerabilities.** Nothing that ships to users is affected.
- Dev dependencies: 16 moderate (transitive, in the Vitest/Vite/esbuild toolchain). These run
  only on the build/test machine and are **not shipped** to the browser or server bundle.
  Tracked, not blocking; resolved as upstream releases land.
- Verify: `npm audit --omit=dev` → 0; `npm audit` → 16 moderate (dev only).

## 2. Injection / XSS surface

- `grep` of `src/` for `dangerouslySetInnerHTML`, `eval(`, `innerHTML`: **none**.
- All rendering is through React (auto-escaped). No user-supplied HTML is rendered.
- Data is in-memory fixtures; there is no SQL/NoSQL query, so no injection sink.
- Search/category come from the URL and are used only as string filters over fixtures
  (`.includes`, equality) — no interpolation into a query or markup.

## 3. Secrets / configuration

- No `.env` committed; `.env*` is git-ignored. `grep process.env` in `src/`: **none**.
- No API keys, tokens, or credentials anywhere in the tree (repo is public).
- The cloned `source-nuxt/` reference is git-ignored and never shipped.

## 4. Response security headers — ADDED and VERIFIED

Added in `next.config.ts` (`headers()`), applied to every route. Verified on a running
production build with `curl -sI http://localhost:3101/`:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

## 5. Client-side storage

- The cart persists to `localStorage` (key `grooveshop-cart`). It holds only non-sensitive
  product/quantity data, and every read/write is wrapped in `try/catch` so a blocked or
  private-mode storage cannot crash the app.

## 6. Recommendations (follow-ups, documented not shipped)

- **Content-Security-Policy**: ship a strict CSP with a per-request nonce for Next's inline
  runtime. Deferred because a half-configured CSP breaks the app; it needs the nonce pipeline.
- **next/image remote domains**: currently only local `/public` SVGs are used, so no remote
  `images.remotePatterns` is configured. Add an explicit allow-list when real media is wired.
- Upgrade dev toolchain as upstream clears the 16 moderate advisories.

## Verdict

No shipped vulnerabilities, no injection or XSS sink, no secrets, and baseline security
headers are live. The one meaningful hardening left is a nonce-based CSP (recommendation 6.1).
