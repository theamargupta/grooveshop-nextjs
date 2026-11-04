// Coverage for the branches the behavioural suite doesn't reach: the default
// (provider-less) context no-ops, and the stored-cart read/validation paths.
// Stored-cart cases use a FRESH module import so the module-level "already read"
// flag starts false.
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useCart } from './cart-context'
import type { Cart } from '@/lib/types'

function Probe() {
  const { cart, addItem, updateItem, removeItem, clear } = useCart()
  // Invoke the context functions so provider-less no-ops are exercised.
  return (
    <output aria-label="items">{String(cart.totalItems)}
      <button onClick={() => { addItem({ id: 1 } as never); updateItem(1, 2); removeItem(1); clear() }}>poke</button>
    </output>
  )
}

const validCart: Cart = {
  currency: 'EUR',
  subtotal: 280,
  totalItems: 1,
  items: [{ productId: 1, slug: 'orbit', name: 'Orbit', image: '/o.svg', unitPrice: 280, quantity: 1, lineTotal: 280 }],
}

afterEach(() => { window.localStorage.clear(); vi.restoreAllMocks(); vi.resetModules() })

describe('cart context — edge coverage', () => {
  it('provider-less context exposes safe no-op actions', () => {
    render(<Probe />)
    const btn = screen.getByRole('button', { name: 'poke' })
    expect(() => btn.click()).not.toThrow()
    expect(screen.getByRole('status', { name: 'items' })).toHaveTextContent('0')
  })

  it('hydrates from a valid stored cart', async () => {
    window.localStorage.setItem('grooveshop-cart', JSON.stringify(validCart))
    vi.resetModules()
    const mod = await import('./cart-context')
    function Show() { return <output aria-label="n">{String(mod.useCart().cart.totalItems)}</output> }
    render(<mod.CartProvider><Show /></mod.CartProvider>)
    expect(screen.getByRole('status', { name: 'n' })).toHaveTextContent('1')
  })

  it('ignores a malformed stored cart', async () => {
    window.localStorage.setItem('grooveshop-cart', JSON.stringify({ not: 'a cart' }))
    vi.resetModules()
    const mod = await import('./cart-context')
    function Show() { return <output aria-label="n">{String(mod.useCart().cart.totalItems)}</output> }
    render(<mod.CartProvider><Show /></mod.CartProvider>)
    expect(screen.getByRole('status', { name: 'n' })).toHaveTextContent('0')
  })
})
