'use client'

import Link from 'next/link'
import { CartCountBadge } from './cart-count-badge'
import { ThemeToggle } from './theme-toggle'
import { useWishlist } from '@/lib/wishlist/wishlist-context'

export function SiteHeader() {
  const { ids } = useWishlist()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link className="flex shrink-0 items-center gap-2.5 rounded-full font-extrabold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-lime text-lg font-black text-ink">G</span>
          <span className="hidden text-lg sm:inline">GrooveShop</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-4 text-sm font-bold text-muted lg:flex">
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/">Home</Link>
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Products</Link>
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/offers">Offers</Link>
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/blog">Blog</Link>
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/rewards">Rewards</Link>
          <Link className="rounded transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/checkout">Checkout</Link>
        </nav>
        <form action="/products" className="ml-auto hidden min-w-44 max-w-xs flex-1 items-center rounded-full bg-background px-3 sm:flex">
          <span aria-hidden="true" className="text-muted">⌕</span>
          <label className="sr-only" htmlFor="site-search">Search products</label>
          <input className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-medium text-foreground outline-none placeholder:text-muted" id="site-search" name="q" placeholder="Search products" type="search" />
        </form>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <ThemeToggle />
          <Link aria-label="Wishlist" className="relative grid size-10 place-items-center rounded-full border border-line text-lg text-foreground transition hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/wishlist">
            <span aria-hidden="true">♡</span>
            {ids.length > 0 ? <span aria-hidden="true" className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-lime px-1 text-[10px] font-extrabold leading-4 text-ink">{ids.length}</span> : null}
          </Link>
          <CartCountBadge />
          <Link className="hidden rounded-full bg-foreground px-4 py-2.5 text-sm font-extrabold text-background transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime md:inline-flex" href="/checkout">Sign in</Link>
        </div>
      </div>
    </header>
  )
}
