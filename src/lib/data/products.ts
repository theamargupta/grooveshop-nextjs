import { products } from './fixtures'
import type { Category, ListProductsOptions, Product } from '@/lib/types'

export function listProducts(opts?: ListProductsOptions): Product[] {
  const category = typeof opts?.category === 'string' ? opts.category : undefined
  const search = typeof opts?.search === 'string' ? opts.search.toLowerCase() : undefined

  return products.filter((product) => {
    const matchesCategory = category === undefined || product.categorySlug === category
    const matchesSearch = search === undefined || product.name.toLowerCase().includes(search)

    return matchesCategory && matchesSearch
  })
}

export function getProductBySlug(slug: string): Product | null {
  if (typeof slug !== 'string') {
    return null
  }

  return products.find((product) => product.slug === slug) ?? null
}

export function listCategories(): Category[] {
  const categories = new Map<string, Category>()

  for (const product of products) {
    if (!categories.has(product.categorySlug)) {
      categories.set(product.categorySlug, {
        slug: product.categorySlug,
        name: product.categoryName,
      })
    }
  }

  return [...categories.values()]
}
