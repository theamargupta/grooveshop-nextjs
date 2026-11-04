'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart/cart-context'
import type { Product } from '@/lib/types'

interface AddToCartProps {
  product: Product
  compact?: boolean
}

export function AddToCart({ product, compact = false }: AddToCartProps) {
  const { addItem } = useCart()
  const [wasAdded, setWasAdded] = useState(false)
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOutOfStock = product.stock === 0

  useEffect(() => () => {
    if (feedbackTimeout.current !== null) {
      clearTimeout(feedbackTimeout.current)
    }
  }, [])

  function handleAddToCart() {
    addItem(product)
    setWasAdded(true)

    if (feedbackTimeout.current !== null) {
      clearTimeout(feedbackTimeout.current)
    }
    feedbackTimeout.current = setTimeout(() => setWasAdded(false), 1800)
  }

  return (
    <div className={compact ? undefined : 'space-y-2'}>
      <button
        className={compact
          ? 'rounded-full bg-ink px-3 py-2 text-xs font-extrabold text-white shadow-lg transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime disabled:cursor-not-allowed disabled:bg-zinc-300'
          : 'w-full rounded-full bg-ink px-5 py-3 font-extrabold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime disabled:cursor-not-allowed disabled:bg-zinc-300'}
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        aria-label={compact && !isOutOfStock ? 'Add to cart' : undefined}
        type="button"
      >
        {isOutOfStock ? 'Out of stock' : wasAdded ? 'Added' : compact ? '+ Add' : 'Add to cart'}
      </button>
      <p aria-live="polite" className={compact ? 'sr-only' : 'min-h-5 text-sm font-medium text-emerald-700'}>
        {wasAdded && !isOutOfStock ? 'Added to cart' : null}
      </p>
    </div>
  )
}
