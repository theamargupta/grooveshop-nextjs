import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '@/lib/cart/cart-context'
import type { Product } from '@/lib/types'
import { AddToCart } from './add-to-cart'
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

describe('AddToCart', () => {
  it('adds its product to the cart when clicked', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <AddToCart product={product} />
        <CartCountBadge />
      </CartProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Add to cart' }))

    expect(screen.getByRole('button', { name: 'Added' })).toBeInTheDocument()
    expect(screen.getByText('Added to cart')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '1 items in cart' })).toBeInTheDocument()
  })

  it('is disabled and names an out-of-stock product', () => {
    render(
      <CartProvider>
        <AddToCart product={{ ...product, stock: 0 }} />
      </CartProvider>,
    )

    expect(screen.getByRole('button', { name: 'Out of stock' })).toBeDisabled()
  })
})
