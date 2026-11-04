import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CartProvider, useCart } from '@/lib/cart/cart-context'
import type { Product } from '@/lib/types'
import { CartCountBadge } from './cart-count-badge'

const product: Product = {
  id: 1,
  slug: 'orbit-pro-headphones',
  name: 'Orbit Pro Headphones',
  description: 'Wireless over-ear headphones.',
  price: 350,
  finalPrice: 280,
  priorPrice: 350,
  discountPercent: 20,
  image: '/products/orbit-pro-headphones.svg',
  stock: 18,
  categorySlug: 'audio',
  categoryName: 'Audio',
  reviewAverage: 4.8,
  reviewCount: 246,
  currency: 'EUR',
  brand: 'Groove',
  brandSlug: 'groove',
  color: 'Black',
  colorHex: '#17171a',
}

function AddTwoItems() {
  const { addItem } = useCart()

  return <button onClick={() => addItem(product, 2)} type="button">Add two items</button>
}

describe('CartCountBadge', () => {
  it('shows zero for an empty cart and the total after items are added', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <AddTwoItems />
        <CartCountBadge />
      </CartProvider>,
    )

    expect(screen.getByRole('link', { name: '0 items in cart' })).toHaveTextContent('Cart (0)')

    await user.click(screen.getByRole('button', { name: 'Add two items' }))

    expect(screen.getByRole('link', { name: '2 items in cart' })).toHaveTextContent('Cart (2)')
  })
})
