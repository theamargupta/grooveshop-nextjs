import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format-price'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const priorPrice = product.priorPrice
  const discount = priorPrice !== null && priorPrice > product.finalPrice
    ? Math.round(((priorPrice - product.finalPrice) / priorPrice) * 100)
    : null

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      data-stock={product.stock === 0 ? 'out-of-stock' : 'in-stock'}
    >
      <Image
        alt={product.name}
        className="aspect-square w-full bg-slate-100 object-cover"
        height={600}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        src={product.image}
        width={600}
      />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">{product.categoryName}</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950">
              <Link className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h2>
          </div>
          {discount !== null ? (
            <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">-{discount}%</span>
          ) : null}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-950">{formatPrice(product.finalPrice, product.currency)}</span>
          {discount !== null && priorPrice !== null ? <del className="text-sm text-slate-500">{formatPrice(priorPrice, product.currency)}</del> : null}
        </div>
        <p className="text-sm text-slate-600" aria-label={`${product.reviewAverage} out of 5 stars from ${product.reviewCount} reviews`}>
          <span aria-hidden="true">★</span> {product.reviewAverage.toFixed(1)} <span className="text-slate-400">({product.reviewCount})</span>
        </p>
        {product.stock === 0 ? <p className="text-sm font-semibold text-rose-700">Out of stock</p> : null}
      </div>
    </article>
  )
}
