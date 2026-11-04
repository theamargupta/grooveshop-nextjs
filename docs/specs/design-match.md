# Spec — Match the GrooveShop storefront design

Goal: our slice must LOOK like the real GrooveShop demo (https://demo.grooveshop.space),
not a generic template. Content stays English; the **visual design** matches the reference.
Tokens below were measured from the live demo.

## Design tokens (measured)

- **Accent (lime):** `#D6F94A` (rgb 214,249,74). Used for: logo mark, sale badges, primary
  highlights, the "AI agents" badge, active pills, price emphasis where the demo uses it.
- **Ink / near-black:** `#17171A` (rgb 23,23,26). Dark pills (Add, Login), dark hero/promo
  sections, headings.
- **Surfaces:** white cards on a light grey page (`#F6F6F7`-ish); product image areas sit on
  soft tinted backgrounds.
- **Rating stars:** warm orange/amber (`#F59E0B`).
- **Font:** **Manrope** (Google Fonts), heavy weights (700–800) for headings. Load via `next/font/google`.
- **Radius:** cards ~`rounded-2xl`/`rounded-3xl`; buttons fully rounded pills.

Define these as CSS tokens in `src/app/globals.css` (Tailwind v4 `@theme`), e.g.
`--color-lime`, `--color-ink`, and map a `brand` scale. One source of truth (Rule 4).

## Header (`site-header.tsx`)
- Left: round **lime logo mark** with "G" + wordmark "GrooveShop".
- Center/left nav: Shop, Offers, Blog, Rewards (plain text links).
- A rounded **search input** (pill, magnifier icon).
- Right: wishlist heart icon, cart icon with the count badge, a **black "Sign in" pill**.
- Sticky, white, subtle bottom border.

## Product card (`product-card.tsx`) — the signature element
- White card, `rounded-2xl`, subtle border/shadow.
- Image sits on a soft tinted square; `rounded` top.
- **Top-left:** lime sale badge `-NN%` (only when on sale).
- **Top-right:** circular wishlist heart button.
- **Bottom-right of image:** dark **"+ Add"** pill button (overlapping the image bottom).
- Below image: brand in **grey uppercase** (use `categoryName` as the eyebrow), product name (bold),
  a row of **orange stars + `rating · reviewCount`**, then **bold price** with the struck prior
  price beside/under it, and a tiny "lowest price in 30 days" micro-note.

## Listing page (`/products`)
- Breadcrumb (Home › Products), big bold title + subtitle.
- **Category pills with counts**: "All products N", then each category with its count — active pill is black.
- **Left filter sidebar**: Category list (with counts), a price range, brand list. (Static/visual is
  fine where wiring is heavy; the category pills + search must work as they do today.)
- Toolbar: "N products" + a sort dropdown (visual).
- 3-column product grid using the card above. Pagination control at the bottom (visual if needed).

## Home (`/`)
- **Dark rounded hero**: bold headline, a **lime primary CTA** + an outline secondary, a product
  image on the right, a small floating product chip. Rounded-3xl, `#17171A` bg.
- **Trust badges row**: free shipping / returns / warranty / secure / "AI-ready" (icons + text).
- **Shop by category** cards (tinted).
- **New arrivals** + **Popular** product rows (the card above).
- **Dark coupon section** (`#17171A`): 3 coupon cards with code chips, lime accents.
- Footer: dark-ish, newsletter signup, link columns, payment + lime "AI agents" badge.

## Detail, Cart, Checkout, Success
Restyle to the same system (Manrope, lime accent, dark pills, rounded cards). The add-to-cart
button is a dark pill; the final price is emphasised; keep all existing behaviour and tests.

## Hard constraints
- **Do not change behaviour or break tests** — all 46 unit tests + both E2E specs stay green.
  Keep accessible names/labels the E2E relies on (e.g. "Add to cart", field labels, "Proceed to
  checkout", "Place order"). If a control's visible text changes, update the E2E in the same change.
- Tailwind v4 CSS-first (no `tailwind.config.js`). No `any`, no eslint-disable.
