'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart/cart-context'
import type { Product } from '@/lib/types'

interface AddToCartProps {
  product: Product
}

export function AddToCart({ product }: AddToCartProps) {
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
    <div className="space-y-2">
      <button
        className="w-full rounded-full bg-indigo-700 px-5 py-3 font-bold text-white transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        type="button"
      >
        {isOutOfStock ? 'Out of stock' : wasAdded ? 'Added' : 'Add to cart'}
      </button>
      <p aria-live="polite" className="min-h-5 text-sm font-medium text-emerald-700">
        {wasAdded && !isOutOfStock ? 'Added to cart' : null}
      </p>
    </div>
  )
}
