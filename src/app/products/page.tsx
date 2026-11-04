import { Suspense } from 'react'
import { ProductFilters } from '@/components/product-filters'
import { ProductGrid } from '@/components/product-grid'
import { ProductSidebar } from '@/components/product-sidebar'
import { listBrands, listCategories, listColors, listProducts } from '@/lib/data/products'

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function priceValue(value: string | undefined): number | undefined {
  if (value === undefined || value === '') {
    return undefined
  }

  const price = Number(value)
  return Number.isFinite(price) ? price : undefined
}

async function ProductResults({ searchParams }: Pick<PageProps<'/products'>, 'searchParams'>) {
  const params = await searchParams
  const category = firstValue(params.category)
  const search = firstValue(params.q)
  const brand = firstValue(params.brand)
  const color = firstValue(params.color)
  const minPrice = priceValue(firstValue(params.minPrice))
  const maxPrice = priceValue(firstValue(params.maxPrice))
  const products = listProducts({ category, search, brand, color, minPrice, maxPrice })
  const allProducts = listProducts()
  const categories = listCategories().map((item) => ({
    ...item,
    count: allProducts.filter((product) => product.categorySlug === item.slug).length,
  }))
  const brands = listBrands().map((item) => ({
    ...item,
    count: allProducts.filter((product) => product.brandSlug === item.slug).length,
  }))
  const colors = listColors().map((item) => ({
    ...item,
    count: allProducts.filter((product) => product.color === item.name).length,
  }))

  return (
    <>
      <ProductFilters categories={categories} totalCount={allProducts.length} />
      <section aria-label="Products" className="mt-9 grid gap-6 lg:grid-cols-[15rem_1fr]">
        <ProductSidebar brands={brands} categories={categories} colors={colors} />
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm font-extrabold text-muted">{products.length} products</p>
            <button className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" type="button">Sort: featured⌄</button>
          </div>
          <ProductGrid products={products} />
          {products.length > 0 ? <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2"><span aria-current="page" className="grid size-10 place-items-center rounded-full bg-ink text-sm font-extrabold text-white">1</span><span className="grid size-10 place-items-center rounded-full border border-line bg-surface text-sm font-extrabold text-muted">2</span></nav> : null}
        </div>
      </section>
    </>
  )
}

export default function ProductsPage({ searchParams }: PageProps<'/products'>) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-bold text-muted">Home <span aria-hidden="true">›</span> Products</p>
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">The collection</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Find your next everyday essential.</h1>
        <p className="max-w-2xl text-muted">Gear that sounds better, moves further, and keeps your everyday rhythm in flow.</p>
      </div>
      <Suspense fallback={<div className="h-36 animate-pulse rounded-2xl bg-surface" />}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
