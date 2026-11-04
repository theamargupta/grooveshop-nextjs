import { describe, it, expect } from 'vitest'
import { listProducts, getProductBySlug, listCategories } from './products'
import type { Product } from '@/lib/types'

describe('product repository (mock data layer)', () => {
  it('lists all products by default', () => {
    const all = listProducts()
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBeGreaterThanOrEqual(8)
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
})
