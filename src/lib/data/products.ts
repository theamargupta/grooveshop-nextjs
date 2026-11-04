import { products } from './fixtures'
import type { Brand, Category, ListProductsOptions, Product, ProductColor } from '@/lib/types'

export function listProducts(opts?: ListProductsOptions): Product[] {
  const category = typeof opts?.category === 'string' ? opts.category : undefined
  const search = typeof opts?.search === 'string' ? opts.search.toLowerCase() : undefined
  const brand = typeof opts?.brand === 'string' ? opts.brand : undefined
  const color = typeof opts?.color === 'string' ? opts.color : undefined
  const minPrice = Number.isFinite(opts?.minPrice) ? opts?.minPrice : undefined
  const maxPrice = Number.isFinite(opts?.maxPrice) ? opts?.maxPrice : undefined

  return products.filter((product) => {
    const matchesCategory = category === undefined || product.categorySlug === category
    const matchesSearch = search === undefined || product.name.toLowerCase().includes(search)
    const matchesBrand = brand === undefined || product.brandSlug === brand
    const matchesColor = color === undefined || product.color === color
    const matchesMinPrice = minPrice === undefined || product.finalPrice >= minPrice
    const matchesMaxPrice = maxPrice === undefined || product.finalPrice <= maxPrice

    return matchesCategory && matchesSearch && matchesBrand && matchesColor && matchesMinPrice && matchesMaxPrice
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

export function listBrands(): Brand[] {
  const brands = new Map<string, Brand>()

  for (const product of products) {
    if (!brands.has(product.brandSlug)) {
      brands.set(product.brandSlug, { slug: product.brandSlug, name: product.brand })
    }
  }

  return [...brands.values()]
}

export function listColors(): ProductColor[] {
  const colors = new Map<string, ProductColor>()

  for (const product of products) {
    if (!colors.has(product.color)) {
      colors.set(product.color, { name: product.color, hex: product.colorHex })
    }
  }

  return [...colors.values()]
}
