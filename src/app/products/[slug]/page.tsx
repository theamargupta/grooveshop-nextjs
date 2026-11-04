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
      <article className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Image
          alt={product.name}
          className="aspect-square w-full rounded-3xl bg-slate-100 object-cover"
          height={900}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={product.image}
          width={900}
        />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">{product.categoryName}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{product.name}</h1>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-950">{formatPrice(product.finalPrice, product.currency)}</span>
            {isOnSale && priorPrice !== null ? <del className="text-lg text-slate-500">{formatPrice(priorPrice, product.currency)}</del> : null}
            {discount !== null ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-sm font-bold text-rose-700">-{discount}%</span> : null}
          </div>
          <p className="text-base leading-7 text-slate-700">{product.description}</p>
          <p className="text-sm font-semibold text-slate-700" data-stock={product.stock === 0 ? 'out-of-stock' : 'in-stock'}>
            {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
          </p>
          <p aria-label={`${product.reviewAverage} out of 5 stars from ${product.reviewCount} reviews`} className="text-sm font-medium text-slate-700">
            <span aria-hidden="true">★</span> {product.reviewAverage.toFixed(1)} ({product.reviewCount} reviews)
          </p>
          <AddToCart product={product} />
        </div>
      </article>
    </main>
  )
}

export default function ProductDetailPage({ params }: PageProps<'/products/[slug]'>) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14"><div className="aspect-square animate-pulse rounded-3xl bg-slate-100" /></main>}>
      <ProductDetails params={params} />
    </Suspense>
  )
}
