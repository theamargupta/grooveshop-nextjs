# Plan — Demo-match v2 (hero light redesign + more pages)  (2026-11-04)

Amar (live feedback, screenshots): our DARK hero must become the LIGHT demo hero
(demo.grooveshop.space). And deliver more of the reference Vue/Nuxt app TODAY.
Base: `main` @ `116269f` (cart fix live). Tokens lime `#D6F94A`, ink `#17171A`, Manrope, Tailwind v4.

**Reference for the hero (Amar's screenshot + https://demo.grooveshop.space):**
- LIGHT rounded hero card (cream/white `#f6f6f7`/white), NOT dark.
- Left: small eyebrow pill ("The rhythm of everyday · 1 / 3"), big headline, one-line subcopy,
  lime primary CTA + outline secondary CTA, then a row of **category pills** + prev/next **carousel arrows**.
- Right: large rounded product image panel.
- Bottom overlapping: a **floating product card** — thumbnail + name + price + strikethrough prior price
  + "Lowest price in 30 days".
- Trust-badges row sits just under the hero (we already have it).

## Lanes (file-disjoint; launch both at once; Codex · high)

### Lane D — Hero light redesign + default light theme
Owns: `src/components/home-hero.tsx`, `src/components/theme-provider.tsx`, `src/app/layout.tsx` (default-theme script only).
- Rebuild `home-hero.tsx` to the LIGHT demo layout above (split into <200-line pieces if needed; a
  `home-hero-card.tsx` for the floating product card is fine). Use the hero product
  (`listProducts()[0]`) for the floating card data. Keep CTAs: primary "Shop now" -> `/products`,
  outline "Explore audio" -> `/products?category=audio`. Category pills: Audio/Wearables/Accessories
  linking to `/products?category=...`; carousel arrows may be static/non-functional for now (visual match).
- Image: use the product's existing illustrated SVG in the right panel for now (real photos = separate
  decision, see below). Make the panel light with a soft tint, demo-like.
- **Default theme -> `light`** (demo defaults light; dark still available via the toggle). Change the
  provider's initial fallback AND the inline anti-FOUC script in `layout.tsx` from `system` to `light`
  when nothing is stored.
- Keep accessible names; no `any`; files <200 lines. RTL test only if a piece has logic.
- Gate: `npx vitest run` + `npx tsc --noEmit` + `npm run lint` + `npx next build`.

### Lane E — More pages (mock-friendly, no backend)
Owns: new `src/app/wishlist/page.tsx`, `src/app/offers/page.tsx`, `src/app/blog/page.tsx`,
`src/app/blog/[slug]/page.tsx`, `src/app/rewards/page.tsx`, `src/app/about/page.tsx`,
`src/app/contact/page.tsx`, `src/app/(info)/returns|privacy|terms/page.tsx`,
plus `src/components/site-header.tsx` (nav hrefs) and `src/components/site-footer.tsx` (footer hrefs),
plus new `src/lib/content/*` for static blog/info content.
- **/wishlist** — reads the wishlist context, shows saved products via `ProductGrid`, empty state;
  wire the header heart link (`/products` -> `/wishlist`). Red test for the page's empty/filled states.
- **/offers** — products where `priorPrice` is set (on sale), reuse `ProductGrid`; wire nav "Offers".
- **/blog + /blog/[slug]** — 3 static posts (from the homepage teasers), simple article layout; wire "Blog".
- **/rewards** — static loyalty page (mirror the homepage loyalty band); wire "Rewards".
- **/about, /contact, /returns, /privacy, /terms** — static content pages; wire the footer links
  (currently all -> `/products`).
- Keep accessible names stable; E2E `e2e/shop-flow.spec.ts` must stay green. Gate as above.

## Open decision (flag to Amar on the answer page)
- **Real product photos vs illustrated SVGs.** The demo uses real photography. Matching "bilkul" means
  real photos. Default for now: keep illustrated SVGs (cohesive, 42 of them), redesign the hero LIGHT to
  match layout. If Amar wants real photos, that is a follow-up lane (source royalty-free or image-gen).

## Leader (this/next session)
Review each lane, merge D then E, gate on merged `main`, screenshot vs the demo, deploy (confirm Amar),
step-8 on prod. Then the recording.
