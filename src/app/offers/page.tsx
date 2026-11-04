import { ProductGrid } from '@/components/product-grid'
import { listProducts } from '@/lib/data/products'

export default function OffersPage() {
  const offers = listProducts().filter((product) => product.priorPrice !== null)

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">Good timing</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Offers worth opening.</h1>
      <p className="mt-3 max-w-2xl text-muted">A rotating selection of everyday gear with a little more value built in.</p>
      <section aria-label="Products on offer" className="mt-9">
        <ProductGrid products={offers} />
      </section>
    </main>
  )
}
