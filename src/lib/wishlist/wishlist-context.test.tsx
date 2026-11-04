import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { WishlistProvider, useWishlist } from './wishlist-context'

function WishlistProbe() {
  const { ids, toggle } = useWishlist()

  return (
    <>
      <output aria-label="wishlist count">{ids.length}</output>
      <button onClick={() => toggle(42)} type="button">Toggle item</button>
    </>
  )
}

function renderWishlist() {
  return render(
    <WishlistProvider>
      <WishlistProbe />
    </WishlistProvider>,
  )
}

afterEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('WishlistProvider', () => {
  it('persists an updated wishlist to localStorage', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const user = userEvent.setup()
    renderWishlist()

    await user.click(screen.getByRole('button', { name: 'Toggle item' }))

    expect(screen.getByRole('status', { name: 'wishlist count' })).toHaveTextContent('1')
    expect(setItem).toHaveBeenCalledWith('grooveshop-wishlist', '[42]')
  })

  it('restores ids from localStorage after remounting', () => {
    window.localStorage.setItem('grooveshop-wishlist', '[42]')
    const firstMount = renderWishlist()

    expect(screen.getByRole('status', { name: 'wishlist count' })).toHaveTextContent('1')
    firstMount.unmount()
    renderWishlist()

    expect(screen.getByRole('status', { name: 'wishlist count' })).toHaveTextContent('1')
  })

  it('continues to update the wishlist when storage throws', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable')
    })
    const user = userEvent.setup()
    renderWishlist()

    await user.click(screen.getByRole('button', { name: 'Toggle item' }))

    expect(screen.getByRole('status', { name: 'wishlist count' })).toHaveTextContent('1')
  })
})
