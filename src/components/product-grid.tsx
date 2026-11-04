import type { Product } from '@/lib/types'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  columns?: 3 | 4
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center font-medium text-muted">
        No products found
      </p>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${columns === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
