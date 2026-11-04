import { describe, it, expect } from 'vitest'
import { emptyCart, addToCart, updateQuantity, removeFromCart } from './cart-logic'
import type { Product } from '@/lib/types'

function product(id: number, finalPrice: number): Product {
  return {
    id,
    slug: `p-${id}`,
    name: `Product ${id}`,
    description: 'x',
    price: finalPrice,
    finalPrice,
    priorPrice: null,
    discountPercent: null,
    image: `/products/p-${id}.svg`,
    stock: 10,
    categorySlug: 'audio',
    categoryName: 'Audio',
    reviewAverage: 4,
    reviewCount: 1,
    currency: 'EUR',
  }
}

describe('cart-logic', () => {
  it('starts empty', () => {
    const c = emptyCart()
    expect(c.items).toEqual([])
    expect(c.subtotal).toBe(0)
    expect(c.totalItems).toBe(0)
    expect(c.currency).toBe('EUR')
  })

  it('adds a product with correct line total and derived totals', () => {
    const c = addToCart(emptyCart(), product(1, 50), 2)
    expect(c.items).toHaveLength(1)
    expect(c.items[0].productId).toBe(1)
    expect(c.items[0].quantity).toBe(2)
    expect(c.items[0].lineTotal).toBe(100)
    expect(c.subtotal).toBe(100)
    expect(c.totalItems).toBe(2)
  })

  it('increments quantity when the same product is added again', () => {
    let c = addToCart(emptyCart(), product(1, 50), 1)
    c = addToCart(c, product(1, 50), 2)
    expect(c.items).toHaveLength(1)
    expect(c.items[0].quantity).toBe(3)
    expect(c.subtotal).toBe(150)
  })

  it('clamps a non-positive add quantity to 1', () => {
    const c = addToCart(emptyCart(), product(1, 50), 0)
    expect(c.items[0].quantity).toBe(1)
  })

  it('does not mutate the input cart', () => {
    const start = emptyCart()
    addToCart(start, product(1, 50), 1)
    expect(start.items).toHaveLength(0)
  })

  it('updates quantity and recomputes totals', () => {
    let c = addToCart(emptyCart(), product(1, 50), 1)
    c = updateQuantity(c, 1, 4)
    expect(c.items[0].quantity).toBe(4)
    expect(c.subtotal).toBe(200)
    expect(c.totalItems).toBe(4)
  })

  it('removes a line when quantity is set to 0 or below', () => {
    let c = addToCart(emptyCart(), product(1, 50), 2)
    c = updateQuantity(c, 1, 0)
    expect(c.items).toHaveLength(0)
    expect(c.subtotal).toBe(0)
  })

  it('removes a product', () => {
    let c = addToCart(emptyCart(), product(1, 50), 1)
    c = addToCart(c, product(2, 30), 1)
    c = removeFromCart(c, 1)
    expect(c.items.map((i) => i.productId)).toEqual([2])
    expect(c.subtotal).toBe(30)
  })

  it('does not throw on unknown product id', () => {
    const c = addToCart(emptyCart(), product(1, 50), 1)
    expect(() => removeFromCart(c, 999)).not.toThrow()
    expect(updateQuantity(c, 999, 5).items).toHaveLength(1)
  })
})
