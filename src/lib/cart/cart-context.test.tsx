import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CartProvider, useCart } from './cart-context'
import type { Product } from '@/lib/types'

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

function CartProbe() {
  const { addItem, cart, clear, removeItem, updateItem } = useCart()

  return (
    <>
      <output aria-label="total items">{cart.totalItems}</output>
      <output aria-label="cart items">{cart.items.map((item) => item.name).join(', ')}</output>
      <button onClick={() => addItem(product)} type="button">Add one</button>
      <button onClick={() => addItem(product, 2)} type="button">Add two</button>
      <button onClick={() => updateItem(product.id, 3)} type="button">Set three</button>
      <button onClick={() => updateItem(product.id, 0)} type="button">Set zero</button>
      <button onClick={() => removeItem(product.id)} type="button">Remove item</button>
      <button onClick={clear} type="button">Clear cart</button>
    </>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <CartProbe />
    </CartProvider>,
  )
}

afterEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('CartProvider', () => {
  it('continues to update the cart when localStorage cannot be read', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable')
    })
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByRole('button', { name: 'Add one' }))

    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('1')
    await user.click(screen.getByRole('button', { name: 'Clear cart' }))
  })

  it('adds items and increments their quantity', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByRole('button', { name: 'Add one' }))
    await user.click(screen.getByRole('button', { name: 'Add two' }))

    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('3')
    expect(screen.getByRole('status', { name: 'cart items' })).toHaveTextContent(product.name)

    await user.click(screen.getByRole('button', { name: 'Clear cart' }))
  })

  it('updates a quantity and removes an item when set to zero', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByRole('button', { name: 'Add one' }))
    await user.click(screen.getByRole('button', { name: 'Set three' }))
    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('3')

    await user.click(screen.getByRole('button', { name: 'Set zero' }))
    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('0')
    expect(screen.getByRole('status', { name: 'cart items' })).toBeEmptyDOMElement()
  })

  it('removes an item and clears the cart', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByRole('button', { name: 'Add one' }))
    await user.click(screen.getByRole('button', { name: 'Remove item' }))
    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: 'Add two' }))
    await user.click(screen.getByRole('button', { name: 'Clear cart' }))
    expect(screen.getByRole('status', { name: 'total items' })).toHaveTextContent('0')
  })

})
