# Spec — price formatting util

## What it does

`formatPrice(amount, currency?)` turns a numeric minor/major amount into a
display string for the storefront. Default currency `EUR` (the GrooveShop demo
store's currency), locale `en-US` style grouping with the currency symbol.

- `formatPrice(19.99)` → `"€19.99"`
- `formatPrice(1000)` → `"€1,000.00"`
- `formatPrice(0)` → `"€0.00"`
- `formatPrice(19.99, "USD")` → `"$19.99"`

## What it refuses to do

- No rounding surprises: always 2 fraction digits.
- Invalid input (`NaN`, non-finite, `null`, `undefined`) → returns `"—"` (never throws, never "NaN"). Rule 5: inputs can be invalid.

## Why

Prices appear on listing, detail, cart and checkout — one formatter, changed in
one place (Rule 4). Centralised so currency/locale is a single switch.
