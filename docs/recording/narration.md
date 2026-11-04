# Narration — The Agentic Journey (crisp cut)

Each `## NN — Title` marks one section. The prose under it is the exact spoken
script. `scripts/tts.mjs` reads this file, strips the headings, and synthesizes one
`audio/NN.mp3` per section. Target ~4 minutes — tight, every number verified against
the repo's own reports.

## 00 — The pitch

This is how I rebuilt the core of the GrooveShop storefront in Next.js — and the point is not the shop, it is the process. Every feature went through the same loop: read the real docs, write a failing test, measure before fixing, and prove it on production before calling it done. So here is that build, honestly — the model mix that wrote it, the real numbers, and the bugs I actually hit. Four minutes.

## 01 — Scope and the loop

First decision: scope. The Nuxt reference is over six hundred components and eight hundred tests — cloning it proves nothing. So I built one thing well: browse, filter, product, cart, checkout, fully tested. And an honesty call — the reference is licensed PolyForm Strict, not open source, so I did not copy their code or their photos. This is my own code, an honest recreation. The loop never bent: the library's own docs for the exact version, a spec, a red test, then code to green, then the full gate — typecheck, lint, unit, end-to-end — before any merge. Hooks enforce it: no code edits until a spec and a failing test exist.

## 02 — The model mix

The build used more than one model, each in its lane. Opus leads: it writes the specs and the failing tests, reviews every change, merges, and deploys. Codex writes the implementation, running in parallel lanes on file-disjoint slices. A real example: three Codex lanes at once — one for the catalog and its filters, one for the homepage, one for dark mode and the wishlist. Disjoint files meant the leader could merge all three and re-run the whole suite on main to prove nothing collided. The lanes never merge their own work. That separation is what makes the review real instead of a rubber stamp.

## 03 — Tests, and the honest bugs

Measured, not asserted: eighty-one unit tests across twenty-two files, around eighty-seven percent coverage, with the thresholds enforced in config so a regression fails the build. The full purchase flow is covered end to end, and recorded to video. Now the honest part. After deploying, every product image showed a blank box with two stray letters. The lazy fix is a retry; instead I measured — fetching the image two ways — and found the real cause: a stale image-optimizer cache. The fix was to serve my own vectors unoptimized. And making this very walkthrough caught another one: new pages had shipped without their tests, quietly dropping coverage below the bar. I did not lower the bar or hide the files — I wrote the missing tests until the real number was back above eighty.

## 04 — Security and the production proof

Before calling it production-ready, a security pass: zero vulnerabilities in anything that ships, five response headers added and verified live, no secrets, no injection sink. Then the step the whole loop builds toward. I deployed to Vercel, confirmed it by commit hash, and drove the live site as a user would — browse, add to cart, checkout, dark mode, wishlist — checking the effect, not just the absence of an error. Done does not mean it compiled. Done means I watched it work in production.

## 05 — The close

The last stretch matched the demo: a light hero, a light default theme, and seven more pages wired into the navigation. That is it — a focused, tested, deployed Next.js storefront, built through a disciplined agentic loop, with every prompt logged in the repo. The takeaway is not the product. It is that an AI workflow earns trust exactly when it refuses to skip the unglamorous steps. Thanks for watching.
