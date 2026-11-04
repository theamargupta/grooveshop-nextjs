import { Suspense } from 'react'
import { ProductFilters } from '@/components/product-filters'
import { ProductGrid } from '@/components/product-grid'
import { listCategories, listProducts } from '@/lib/data/products'

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

async function ProductResults({ searchParams }: Pick<PageProps<'/products'>, 'searchParams'>) {
  const params = await searchParams
  const category = firstValue(params.category)
  const search = firstValue(params.q)
  const products = listProducts({ category, search })

  return (
    <>
      <ProductFilters categories={listCategories()} />
      <section aria-label="Products" className="mt-9">
        <ProductGrid products={products} />
      </section>
    </>
  )
}

export default function ProductsPage({ searchParams }: PageProps<'/products'>) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">The collection</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Find your next everyday essential.</h1>
      </div>
      <Suspense fallback={<div className="h-36 animate-pulse rounded-2xl bg-slate-100" />}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
