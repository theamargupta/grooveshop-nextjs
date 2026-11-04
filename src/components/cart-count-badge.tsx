'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart/cart-context'

export function CartCountBadge() {
  const { cart } = useCart()

  return (
    <Link aria-label={`${cart.totalItems} items in cart`} className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/cart">
      Cart ({cart.totalItems})
    </Link>
  )
}
