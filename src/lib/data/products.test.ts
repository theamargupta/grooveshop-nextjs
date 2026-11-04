import { describe, it, expect } from 'vitest'
import { listProducts, getProductBySlug, listBrands, listCategories, listColors } from './products'
import type { Product } from '@/lib/types'

describe('product repository (mock data layer)', () => {
  it('lists all products by default', () => {
    const all = listProducts()
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBeGreaterThanOrEqual(36)
  })

  it('exposes products across at least two categories', () => {
    const categories = listCategories()
    expect(categories.length).toBeGreaterThanOrEqual(2)
    expect(categories[0]).toHaveProperty('slug')
    expect(categories[0]).toHaveProperty('name')
  })

  it('filters by category', () => {
    const cat = listCategories()[0].slug
    const inCat = listProducts({ category: cat })
    expect(inCat.length).toBeGreaterThan(0)
    expect(inCat.every((p: Product) => p.categorySlug === cat)).toBe(true)
  })

  it('filters by search, case-insensitive', () => {
    const first = listProducts()[0]
    const term = first.name.slice(0, 3).toUpperCase()
    const found = listProducts({ search: term })
    expect(found.some((p) => p.id === first.id)).toBe(true)
  })

  it('filters by brand', () => {
    const products = listProducts({ brand: 'groove' })

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => product.brandSlug === 'groove')).toBe(true)
  })

  it('filters by color', () => {
    const products = listProducts({ color: 'Black' })

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => product.color === 'Black')).toBe(true)
  })

  it('filters by an inclusive price range', () => {
    const products = listProducts({ minPrice: 79, maxPrice: 79 })

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => product.finalPrice >= 79 && product.finalPrice <= 79)).toBe(true)
  })

  it('combines category, brand, and price filters', () => {
    const products = listProducts({ category: 'audio', brand: 'groove', minPrice: 100, maxPrice: 300 })

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => (
      product.categorySlug === 'audio'
      && product.brandSlug === 'groove'
      && product.finalPrice >= 100
      && product.finalPrice <= 300
    ))).toBe(true)
  })

  it('lists the available brands', () => {
    const brands = listBrands()

    expect(brands.length).toBeGreaterThanOrEqual(4)
    expect(brands).toEqual(expect.arrayContaining([
      expect.objectContaining({ slug: 'groove', name: 'Groove' }),
      expect.objectContaining({ slug: 'kabelo', name: 'Kabelo' }),
      expect.objectContaining({ slug: 'nexis', name: 'Nexis' }),
      expect.objectContaining({ slug: 'voltra', name: 'Voltra' }),
    ]))
  })

  it('lists the available colors', () => {
    const colors = listColors()

    expect(colors.length).toBeGreaterThan(0)
    expect(colors[0]).toEqual(expect.objectContaining({ name: expect.any(String), hex: expect.any(String) }))
  })

  it('returns [] for an unknown category instead of throwing', () => {
    expect(listProducts({ category: 'does-not-exist' })).toEqual([])
  })

  it('gets a product by slug', () => {
    const first = listProducts()[0]
    const found = getProductBySlug(first.slug)
    expect(found).not.toBeNull()
    expect(found?.slug).toBe(first.slug)
  })

  it('returns null for an unknown slug', () => {
    expect(getProductBySlug('nope-nope-nope')).toBeNull()
  })

  it('has a product on sale (priorPrice set) and one out of stock', () => {
    const all = listProducts()
    expect(all.some((p) => p.priorPrice !== null && p.priorPrice > p.finalPrice)).toBe(true)
    expect(all.some((p) => p.stock === 0)).toBe(true)
  })

  it('keeps one third of the catalogue on sale and one product out of stock per category', () => {
    const all = listProducts()

    expect(all.filter((product) => product.priorPrice !== null).length).toBe(14)
    for (const category of listCategories()) {
      expect(all.filter((product) => product.categorySlug === category.slug && product.stock === 0).length).toBe(1)
    }
  })
})
