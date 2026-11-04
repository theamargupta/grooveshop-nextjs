# Plan — Design match to GrooveShop demo

Spec: `docs/specs/design-match.md` (measured tokens: lime `#D6F94A`, ink `#17171A`,
font Manrope, orange stars). Restyle the existing slice to look like
https://demo.grooveshop.space — behaviour and tests unchanged.

## Phase D.1 — design system + restyle
Who: codex · high

1. **Tokens + font**: in `src/app/globals.css` define the brand tokens (Tailwind v4 `@theme`):
   lime `#D6F94A`, ink `#17171A`, light surface, amber stars. Load **Manrope** via
   `next/font/google` in `src/app/layout.tsx` and apply as the base font.
2. **Header** (`site-header.tsx`): lime round logo mark + "GrooveShop" wordmark; Shop/Offers/Blog/
   Rewards links; a rounded search pill; wishlist + cart (with count badge) icons; a black "Sign in"
   pill. Sticky white with a bottom border. Keep the cart link to `/cart`.
3. **Product card** (`product-card.tsx`): white `rounded-2xl` card; image on a soft tinted square;
   lime `-NN%` badge top-left (on sale only); circular wishlist heart top-right; dark **"+ Add"**
   pill bottom-right of the image; grey uppercase brand (use `categoryName`); bold name; **orange
   stars + `rating · reviewCount`**; bold price with struck prior price; tiny "lowest price in
   30 days" note. KEEP the accessible link name = product name and don't remove the add control.
4. **Listing** (`/products` + `product-filters.tsx`): breadcrumb, bold title + subtitle; category
   pills WITH counts (active = black); keep search + category wiring working; 3-col grid; a left
   filter sidebar (category list w/ counts + a price range + brand list — visual is fine, but the
   existing search/category filter must keep working); a "N products" + sort toolbar (sort may be visual).
5. **Home** (`/`): dark `rounded-3xl` hero (headline + lime CTA + outline CTA + product image);
   trust-badges row; shop-by-category tiles; new-arrivals + popular product rows; dark coupon
   section with 3 code chips; richer footer (newsletter + link columns + payment + lime "AI-ready" badge).
6. **Detail / Cart / Checkout / Success**: same system — Manrope, lime accent, dark pills, rounded
   cards, emphasised price. Add-to-cart stays a dark pill named "Add to cart".

## Done condition
```
npx vitest run                         # all 46 green (DO NOT change tests except accessible-name updates)
npx next typegen && npx tsc --noEmit   # clean
npx eslint src                         # clean
npm run build                          # succeeds
```

## Rules
- **Behaviour and accessible names unchanged** — the E2E relies on: product-name links,
  "Add to cart", field labels (Full name / Email address / Address / City / Postal code / Country),
  "Proceed to checkout", "Place order", "Subtotal", "No products found", "Out of stock". If any
  VISIBLE text must change, update `e2e/shop-flow.spec.ts` in the same change and keep it green.
- Tailwind v4 only (no config file). No `any`, no eslint-disable, no swallowed errors.
- Files < 200 lines; split a section into its own component if needed. Commit on green; report SHA.
- Build may not finish in your sandbox (Turbopack port) — if so, report STATUS: blocked with the
  other three gates green and leave the work committed/uncommitted for the leader to build + review.
