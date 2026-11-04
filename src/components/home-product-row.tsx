import Link from 'next/link'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/types'

interface HomeProductRowProps {
  eyebrow: string
  title: string
  products: Product[]
}

export function HomeProductRow({ eyebrow, title, products }: HomeProductRowProps) {
  return <section aria-label={title} className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
    <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">{eyebrow}</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{title}</h2></div><Link className="text-sm font-extrabold text-ink underline decoration-lime decoration-4 underline-offset-4" href="/products">Shop all products</Link></div>
    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
  </section>
}
