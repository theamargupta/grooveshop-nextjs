'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart/cart-context'

export function CartCountBadge() {
  const { cart } = useCart()

  return (
    <Link aria-label={`${cart.totalItems} items in cart`} className="relative inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-extrabold text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/cart">
      <span aria-hidden="true" className="text-lg leading-none">⌑</span>
      <span>Cart ({cart.totalItems})</span>
    </Link>
  )
}
