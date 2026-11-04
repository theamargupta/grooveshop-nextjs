'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AddToCart } from './add-to-cart'
import { formatPrice } from '@/lib/format-price'
import type { Product } from '@/lib/types'
import { useWishlist } from '@/lib/wishlist/wishlist-context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { has, toggle } = useWishlist()
  const priorPrice = product.priorPrice
  const discount = priorPrice !== null && priorPrice > product.finalPrice
    ? Math.round(((priorPrice - product.finalPrice) / priorPrice) * 100)
    : null

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      data-stock={product.stock === 0 ? 'out-of-stock' : 'in-stock'}
    >
      <div className="relative m-2 overflow-hidden rounded-xl bg-[#f0f1e8]">
        <Image
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={product.image}
          width={600}
        />
        {discount !== null ? <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-xs font-extrabold text-ink">-{discount}%</span> : null}
        <button aria-label={`Add ${product.name} to wishlist`} aria-pressed={has(product.id)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-surface text-lg text-foreground shadow-sm transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" onClick={() => toggle(product.id)} type="button">
          <span aria-hidden="true">{has(product.id) ? '♥' : '♡'}</span>
        </button>
        {product.stock > 0 ? <div className="absolute bottom-3 right-3"><AddToCart compact product={product} /></div> : null}
      </div>
      <div className="space-y-2 px-5 pb-5 pt-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{product.categoryName}</p>
        <h2 className="text-lg font-extrabold leading-6 text-foreground">
          <Link className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h2>
        <p className="text-sm font-bold text-muted" aria-label={`${product.reviewAverage} out of 5 stars from ${product.reviewCount} reviews`}>
          <span aria-hidden="true" className="tracking-wide text-amber">★★★★★</span> <span>{product.reviewAverage.toFixed(1)} · {product.reviewCount}</span>
        </p>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-lg font-extrabold text-foreground">{formatPrice(product.finalPrice, product.currency)}</span>
          {discount !== null && priorPrice !== null ? <del className="text-sm font-semibold text-zinc-400">{formatPrice(priorPrice, product.currency)}</del> : null}
        </div>
        <p className="text-xs font-medium text-muted">Lowest price in 30 days</p>
        {product.stock === 0 ? <p className="text-sm font-extrabold text-rose-700">Out of stock</p> : null}
      </div>
    </article>
  )
}
