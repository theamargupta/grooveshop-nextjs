import Link from 'next/link'
import { CartCountBadge } from './cart-count-badge'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link className="flex shrink-0 items-center gap-2.5 rounded-full font-extrabold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-lime text-lg font-black text-ink">G</span>
          <span className="hidden text-lg sm:inline">GrooveShop</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-4 text-sm font-bold text-zinc-600 lg:flex">
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/">Home</Link>
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Products</Link>
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products?category=audio">Offers</Link>
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Blog</Link>
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Rewards</Link>
          <Link className="rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/checkout">Checkout</Link>
        </nav>
        <form action="/products" className="ml-auto hidden min-w-44 max-w-xs flex-1 items-center rounded-full bg-zinc-100 px-3 sm:flex">
          <span aria-hidden="true" className="text-zinc-500">⌕</span>
          <label className="sr-only" htmlFor="site-search">Search products</label>
          <input className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-medium text-ink outline-none placeholder:text-zinc-500" id="site-search" name="q" placeholder="Search products" type="search" />
        </form>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Link aria-label="Wishlist" className="grid size-10 place-items-center rounded-full border border-zinc-200 text-lg text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">
            <span aria-hidden="true">♡</span>
          </Link>
          <CartCountBadge />
          <Link className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime md:inline-flex" href="/checkout">Sign in</Link>
        </div>
      </div>
    </header>
  )
}
