# Spec — Cart logic + Product Detail (Phase 4)

## Pure cart logic (`src/lib/cart/cart-logic.ts`) — no React, no storage
Operates on the `Cart` type (`src/lib/types.ts`). All functions are pure: take a cart,
return a NEW cart (never mutate).

- `emptyCart(currency?)` → `Cart` with `items: []`, `totalItems: 0`, `subtotal: 0`, currency (default EUR).
- `addToCart(cart, product, qty = 1)` → adds `qty` of product; if already present, increases its quantity;
  `qty` is clamped to ≥ 1; unit price is `product.finalPrice`.
- `updateQuantity(cart, productId, qty)` → sets quantity; `qty <= 0` removes the line.
- `removeFromCart(cart, productId)` → removes the line (no-op if absent).
- Every returned cart has correct derived values: each item's `lineTotal = unitPrice * quantity`,
  cart `subtotal = Σ lineTotal`, `totalItems = Σ quantity`.
- Never throws on unknown productId or bad qty (Rule 5).

## Cart provider (`src/lib/cart/cart-context.tsx`) — `'use client'`
- React context wrapping the pure logic; persists to `localStorage` (key `grooveshop-cart`),
  guarded with try/catch (private mode / disabled storage must not crash — Rule 5).
- Exposes `useCart()` → `{ cart, addItem, updateItem, removeItem, clear }`.
- Provider mounted in `src/app/layout.tsx`.

## Product detail (`src/app/products/[slug]/page.tsx`) — Server Component
- Next 16: `params` is a Promise — `await params` to read `slug`.
- `getProductBySlug(slug)`; if null → `notFound()`.
- Shows image (next/image), name, `formatPrice(finalPrice)`, struck prior price + `-NN%` when on sale,
  description, stock state, review summary.
- `generateMetadata` sets the page `<title>` to the product name.
- Includes an `AddToCart` client button (`src/components/add-to-cart.tsx`) that calls `useCart().addItem`;
  disabled when `stock === 0`.

## What it refuses to do
- Cart logic has zero React/DOM/storage deps (so it is trivially unit-tested).
- No crash when localStorage is unavailable.

## Why
Cart math lives in one pure module (Rule 3/4): the provider and the checkout both reuse it,
and it is the part that must be provably correct.
