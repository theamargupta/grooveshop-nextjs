import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductGrid } from './product-grid'
import type { Product } from '@/lib/types'

function makeProduct(id: number, name: string): Product {
  return {
    id,
    slug: `p-${id}`,
    name,
    description: 'x',
    price: 100,
    finalPrice: 100,
    priorPrice: null,
    discountPercent: null,
    image: `/products/p-${id}.svg`,
    stock: 5,
    categorySlug: 'audio',
    categoryName: 'Audio',
    reviewAverage: 4,
    reviewCount: 10,
    currency: 'EUR',
  }
}

describe('ProductGrid', () => {
  it('renders one card per product', () => {
    render(<ProductGrid products={[makeProduct(1, 'Alpha'), makeProduct(2, 'Beta'), makeProduct(3, 'Gamma')]} />)
    expect(screen.getByRole('link', { name: /alpha/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /beta/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gamma/i })).toBeInTheDocument()
  })

  it('shows an empty state for no products', () => {
    render(<ProductGrid products={[]} />)
    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })
})
