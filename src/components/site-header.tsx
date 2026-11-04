import Link from 'next/link'
import { CartCountBadge } from './cart-count-badge'

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link className="text-lg font-black tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/">
          GrooveShop
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold text-slate-700">
          <Link className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 hover:text-indigo-700" href="/">Home</Link>
          <Link className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 hover:text-indigo-700" href="/products">Products</Link>
          <Link className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 hover:text-indigo-700" href="/checkout">Checkout</Link>
          <CartCountBadge />
        </nav>
      </div>
    </header>
  )
}
