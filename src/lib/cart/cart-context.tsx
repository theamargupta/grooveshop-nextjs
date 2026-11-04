'use client'

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react'
import type { Cart, Product } from '@/lib/types'
import { addToCart, emptyCart, removeFromCart, updateQuantity } from './cart-logic'

const STORAGE_KEY = 'grooveshop-cart'

interface CartContextValue {
  cart: Cart
  addItem: (product: Product, quantity?: number) => void
  updateItem: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clear: () => void
}

const fallbackCart = emptyCart()
const cartListeners = new Set<() => void>()
let browserCart = fallbackCart
let hasReadStoredCart = false
const CartContext = createContext<CartContextValue>({
  cart: fallbackCart,
  addItem: () => undefined,
  updateItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
})

function isStoredCart(value: unknown): value is Cart {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<Cart>
  return typeof candidate.currency === 'string'
    && Array.isArray(candidate.items)
    && typeof candidate.subtotal === 'number'
    && typeof candidate.totalItems === 'number'
    && candidate.items.every((item) => typeof item === 'object' && item !== null
      && typeof item.productId === 'number'
      && typeof item.slug === 'string'
      && typeof item.name === 'string'
      && typeof item.image === 'string'
      && typeof item.unitPrice === 'number'
      && typeof item.quantity === 'number'
      && typeof item.lineTotal === 'number')
}

function readStoredCart(): Cart | null {
  try {
    const serializedCart = window.localStorage.getItem(STORAGE_KEY)
    if (serializedCart === null) {
      return null
    }

    const storedCart: unknown = JSON.parse(serializedCart)
    return isStoredCart(storedCart) ? storedCart : null
  } catch {
    return null
  }
}

function persistCart(cart: Cart): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Storage can be unavailable, so the cart remains available for this session only.
  }
}

function getServerCart(): Cart {
  return fallbackCart
}

function getBrowserCart(): Cart {
  if (!hasReadStoredCart) {
    browserCart = readStoredCart() ?? fallbackCart
    hasReadStoredCart = true
  }

  return browserCart
}

function subscribeToCart(listener: () => void): () => void {
  cartListeners.add(listener)
  return () => cartListeners.delete(listener)
}

function updateCart(updater: (cart: Cart) => Cart): void {
  browserCart = updater(getBrowserCart())
  persistCart(browserCart)
  cartListeners.forEach((listener) => listener())
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(subscribeToCart, getBrowserCart, getServerCart)

  const addItem = useCallback((product: Product, quantity?: number) => {
    updateCart((currentCart) => addToCart(currentCart, product, quantity))
  }, [])

  const updateItem = useCallback((productId: number, quantity: number) => {
    updateCart((currentCart) => updateQuantity(currentCart, productId, quantity))
  }, [])

  const removeItem = useCallback((productId: number) => {
    updateCart((currentCart) => removeFromCart(currentCart, productId))
  }, [])

  const clear = useCallback(() => {
    updateCart((currentCart) => emptyCart(currentCart.currency))
  }, [])

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  return useContext(CartContext)
}
