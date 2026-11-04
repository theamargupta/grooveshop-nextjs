import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/types'
import { CartProvider } from '@/lib/cart/cart-context'

const base: Product = {
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

function renderProductCard(product: Product) {
  return render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>,
  )
}

describe('ProductCard', () => {
  it('links to the product detail page by slug', () => {
    renderProductCard(base)
    const link = screen.getByRole('link', { name: /orbit pro headphones/i })
    expect(link).toHaveAttribute('href', '/products/orbit-pro-headphones')
  })

  it('shows the final price formatted', () => {
    renderProductCard(base)
    expect(screen.getByText('€280.00')).toBeInTheDocument()
  })

  it('shows the struck prior price and a discount badge when on sale', () => {
    renderProductCard(base)
    expect(screen.getByText('€350.00')).toBeInTheDocument()
    expect(screen.getByText(/-20%/)).toBeInTheDocument()
  })

  it('renders an image with the product name as alt text', () => {
    renderProductCard(base)
    expect(screen.getByRole('img', { name: /orbit pro headphones/i })).toBeInTheDocument()
  })

  it('marks an out-of-stock product', () => {
    renderProductCard({ ...base, stock: 0 })
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
  })

  it('does not show a discount badge for a full-price product', () => {
    renderProductCard({ ...base, finalPrice: 350, priorPrice: null, discountPercent: null })
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument()
  })
})
