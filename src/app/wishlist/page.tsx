'use client'

import Link from 'next/link'
import { ProductGrid } from '@/components/product-grid'
import { listProducts } from '@/lib/data/products'
import { useWishlist } from '@/lib/wishlist/wishlist-context'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const savedProducts = listProducts().filter((product) => ids.includes(product.id))

  if (savedProducts.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">Your wishlist</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground">Your wishlist is empty.</h1>
        <p className="mt-4 text-muted">Save the gear that feels like a future favourite.</p>
        <Link className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-extrabold text-white transition hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">
          Browse products
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">Your wishlist</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Your saved finds.</h1>
      <p className="mt-3 max-w-2xl text-muted">The products you want to come back to, all in one place.</p>
      <section aria-label="Saved products" className="mt-9">
        <ProductGrid products={savedProducts} />
      </section>
    </main>
  )
}
