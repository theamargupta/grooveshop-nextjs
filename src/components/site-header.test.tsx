import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '@/lib/cart/cart-context'
import { SiteHeader } from './site-header'

describe('SiteHeader', () => {
  it('renders the primary navigation links', () => {
    render(
      <CartProvider>
        <SiteHeader />
      </CartProvider>,
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: '0 items in cart' })).toHaveAttribute('href', '/cart')
  })
})
