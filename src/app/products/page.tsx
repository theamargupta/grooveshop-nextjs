import { Suspense } from 'react'
import { ProductFilters } from '@/components/product-filters'
import { ProductGrid } from '@/components/product-grid'
import { ProductSidebar } from '@/components/product-sidebar'
import { listCategories, listProducts } from '@/lib/data/products'

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

async function ProductResults({ searchParams }: Pick<PageProps<'/products'>, 'searchParams'>) {
  const params = await searchParams
  const category = firstValue(params.category)
  const search = firstValue(params.q)
  const products = listProducts({ category, search })
  const allProducts = listProducts()
  const categories = listCategories().map((item) => ({
    ...item,
    count: allProducts.filter((product) => product.categorySlug === item.slug).length,
  }))

  return (
    <>
      <ProductFilters categories={categories} totalCount={allProducts.length} />
      <section aria-label="Products" className="mt-9 grid gap-6 lg:grid-cols-[15rem_1fr]">
        <ProductSidebar categories={categories} />
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm font-extrabold text-zinc-600">{products.length} products</p>
            <button className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" type="button">Sort: featured⌄</button>
          </div>
          <ProductGrid products={products} />
          {products.length > 0 ? <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2"><span aria-current="page" className="grid size-10 place-items-center rounded-full bg-ink text-sm font-extrabold text-white">1</span><span className="grid size-10 place-items-center rounded-full border border-line bg-white text-sm font-extrabold text-zinc-500">2</span></nav> : null}
        </div>
      </section>
    </>
  )
}

export default function ProductsPage({ searchParams }: PageProps<'/products'>) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-bold text-zinc-500">Home <span aria-hidden="true">›</span> Products</p>
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-zinc-500">The collection</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Find your next everyday essential.</h1>
        <p className="max-w-2xl text-zinc-600">Gear that sounds better, moves further, and keeps your everyday rhythm in flow.</p>
      </div>
      <Suspense fallback={<div className="h-36 animate-pulse rounded-2xl bg-slate-100" />}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
