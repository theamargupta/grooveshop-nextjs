import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AddToCart } from '@/components/add-to-cart'
import { formatPrice } from '@/lib/format-price'
import { getProductBySlug } from '@/lib/data/products'

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  return { title: product?.name ?? 'Product not found' }
}

async function ProductDetails({ params }: Pick<PageProps<'/products/[slug]'>, 'params'>) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (product === null) {
    notFound()
  }

  const priorPrice = product.priorPrice
  const isOnSale = priorPrice !== null && priorPrice > product.finalPrice
  const discount = priorPrice !== null && isOnSale
    ? Math.round(((priorPrice - product.finalPrice) / priorPrice) * 100)
    : null

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="mb-7 text-sm font-bold text-muted">Home <span aria-hidden="true">›</span> Products <span aria-hidden="true">›</span> {product.name}</p>
      <article className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Image
          alt={product.name}
          className="aspect-square w-full rounded-3xl bg-[#edf0df] object-cover"
          height={900}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={product.image}
          width={900}
        />
        <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-line sm:p-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">{product.categoryName}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{product.name}</h1>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-foreground">{formatPrice(product.finalPrice, product.currency)}</span>
            {isOnSale && priorPrice !== null ? <del className="text-lg font-bold text-muted">{formatPrice(priorPrice, product.currency)}</del> : null}
            {discount !== null ? <span className="rounded-full bg-lime px-2.5 py-1 text-sm font-extrabold text-ink">-{discount}%</span> : null}
          </div>
          <p className="mt-1 text-xs font-medium text-muted">Lowest price in 30 days</p>
          <p className="mt-6 text-base leading-7 text-muted">{product.description}</p>
          <p className="mt-5 text-sm font-extrabold text-foreground" data-stock={product.stock === 0 ? 'out-of-stock' : 'in-stock'}>
            {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
          </p>
          <p aria-label={`${product.reviewAverage} out of 5 stars from ${product.reviewCount} reviews`} className="mt-3 text-sm font-bold text-muted">
            <span aria-hidden="true" className="text-amber">★★★★★</span> {product.reviewAverage.toFixed(1)} · {product.reviewCount}
          </p>
          <div className="mt-7"><AddToCart product={product} /></div>
        </div>
      </article>
    </main>
  )
}

export default function ProductDetailPage({ params }: PageProps<'/products/[slug]'>) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14"><div className="aspect-square animate-pulse rounded-3xl bg-surface" /></main>}>
      <ProductDetails params={params} />
    </Suspense>
  )
}
