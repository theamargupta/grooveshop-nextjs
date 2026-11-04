import type { Cart, CartItem, Product } from '@/lib/types'

const DEFAULT_CURRENCY = 'EUR'

function addQuantity(quantity: number): number {
  return Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
}

function updateQuantityValue(quantity: number): number {
  return Number.isFinite(quantity) ? Math.floor(quantity) : 0
}

function withDerivedTotals(currency: string, items: CartItem[]): Cart {
  const normalizedItems = items.map((item) => ({
    ...item,
    lineTotal: item.unitPrice * item.quantity,
  }))

  return {
    currency,
    items: normalizedItems,
    subtotal: normalizedItems.reduce((subtotal, item) => subtotal + item.lineTotal, 0),
    totalItems: normalizedItems.reduce((totalItems, item) => totalItems + item.quantity, 0),
  }
}

function itemForProduct(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    unitPrice: product.finalPrice,
    quantity,
    lineTotal: product.finalPrice * quantity,
  }
}

export function emptyCart(currency: string = DEFAULT_CURRENCY): Cart {
  return {
    currency,
    items: [],
    subtotal: 0,
    totalItems: 0,
  }
}

export function addToCart(cart: Cart, product: Product, quantity: number = 1): Cart {
  const quantityToAdd = addQuantity(quantity)
  const existingItem = cart.items.find((item) => item.productId === product.id)
  const items = existingItem === undefined
    ? [...cart.items, itemForProduct(product, quantityToAdd)]
    : cart.items.map((item) => item.productId === product.id
      ? { ...item, quantity: item.quantity + quantityToAdd }
      : { ...item })

  return withDerivedTotals(cart.currency, items)
}

export function updateQuantity(cart: Cart, productId: number, quantity: number): Cart {
  const nextQuantity = updateQuantityValue(quantity)
  const items = nextQuantity <= 0
    ? cart.items.filter((item) => item.productId !== productId).map((item) => ({ ...item }))
    : cart.items.map((item) => item.productId === productId
      ? { ...item, quantity: nextQuantity }
      : { ...item })

  return withDerivedTotals(cart.currency, items)
}

export function removeFromCart(cart: Cart, productId: number): Cart {
  return withDerivedTotals(
    cart.currency,
    cart.items.filter((item) => item.productId !== productId).map((item) => ({ ...item })),
  )
}
