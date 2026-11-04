import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format-price'
import type { Product } from '@/lib/types'

interface HomeHeroCardProps {
  product: Product
}

export function HomeHeroCard({ product }: HomeHeroCardProps) {
  return (
    <article className="absolute bottom-0 left-4 right-4 z-10 translate-y-1/2 rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-black/10 sm:left-10 sm:right-auto sm:w-[25rem] sm:p-4 lg:left-14">
      <div className="flex items-center gap-3">
        <div className="shrink-0 overflow-hidden rounded-xl bg-[#edf2db]">
          <Image alt="" className="size-16 object-cover" height={128} sizes="64px" src={product.image} width={128} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">Featured drop</p>
          <h2 className="mt-1 truncate text-base font-extrabold text-foreground">
            <Link className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h2>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-extrabold text-foreground">{formatPrice(product.finalPrice, product.currency)}</span>
            {product.priorPrice === null ? null : <del className="text-sm font-semibold text-muted">{formatPrice(product.priorPrice, product.currency)}</del>}
          </div>
          <p className="mt-1 text-xs font-medium text-muted">Lowest price in 30 days</p>
        </div>
      </div>
    </article>
  )
}
