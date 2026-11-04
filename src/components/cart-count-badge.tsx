'use client'

import { useCart } from '@/lib/cart/cart-context'

export function CartCountBadge() {
  const { cart } = useCart()

  return (
    <span aria-label={`${cart.totalItems} items in cart`} className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
      Cart ({cart.totalItems})
    </span>
  )
}
