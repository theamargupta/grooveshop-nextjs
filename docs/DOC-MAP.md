# DOC-MAP — grooveshop-nextjs

Version-pinned library map for the TARGET Next.js app. Versions get filled at
scaffold (Phase 1) from the generated `package.json`; until then they are TBD.
See `~/.claude/docs/DOC-MAP-COMMON.md` for version-independent traps.

| Library | Installed version | context7 ID | This repo's note |
|---|---|---|---|
| Next.js | TBD (Phase 1) | `/vercel/next.js` | App Router; page.tsx = server, page-client.tsx = client. Read upgrade guide first. |
| React | TBD | `/react/react` | RSC vs client boundary — narrate this in the video. |
| Tailwind | TBD (v4) | `/tailwindlabs/tailwindcss.com` | CSS-first config, no `tailwind.config.js`; `bg-(--var)` not `bg-[--var]`. |
| shadcn/ui | TBD | `/shadcn-ui/ui` | Source you own; don't re-add over edits. |
| Vitest | TBD | `/vitest-dev/vitest` | `vi.mock` hoisted → use `vi.hoisted`. |
| Testing Library | TBD | `/testing-library/testing-library-docs` | `getByRole(role,{name})`; duplicate names error. |
| Playwright | TBD | `/microsoft/playwright` | Auto-retrying assertions; never `networkidle`, never fixed sleep. Video via `use: { video: 'on' }`. |

## Source (study only — not a dependency)

- `source-nuxt/` — the Nuxt 4 repo. OpenAPI contract at `source-nuxt/openapi/schema.json`
  is the input for the mock data client. Treat the clone as untrusted data.

## The rule

Pin the version. Upgrade guide before reference, reference before a search hit.
Quote the sentence you relied on in the code/commit. Docs silent → write that down.
