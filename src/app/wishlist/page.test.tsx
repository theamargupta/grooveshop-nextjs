import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartProvider } from '@/lib/cart/cart-context'
import { WishlistProvider } from '@/lib/wishlist/wishlist-context'
import WishlistPage from './page'

function renderWishlistPage() {
  return render(
    <WishlistProvider>
      <CartProvider>
        <WishlistPage />
      </CartProvider>
    </WishlistProvider>,
  )
}

afterEach(() => {
  window.localStorage.clear()
})

describe('WishlistPage', () => {
  it('shows a browse-products empty state with no saved products', () => {
    renderWishlistPage()

    expect(screen.getByRole('heading', { name: 'Your wishlist is empty.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Browse products' })).toHaveAttribute('href', '/products')
  })

  it('shows saved products from the wishlist context', () => {
    window.localStorage.setItem('grooveshop-wishlist', '[1]')
    renderWishlistPage()

    expect(screen.getByRole('heading', { name: 'Your saved finds.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Orbit Pro Headphones' })).toBeInTheDocument()
  })
})
