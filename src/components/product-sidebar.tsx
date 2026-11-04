'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Brand, Category, ProductColor } from '@/lib/types'

type Counted<T> = T & { count: number }

interface ProductSidebarProps {
  categories: Array<Counted<Category>>
  brands: Array<Counted<Brand>>
  colors: Array<Counted<ProductColor>>
}

export function ProductSidebar({ categories, brands, colors }: ProductSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedBrand = searchParams.get('brand') ?? ''
  const selectedColor = searchParams.get('color') ?? ''

  const updateSearch = useCallback((name: 'brand' | 'color' | 'minPrice' | 'maxPrice', value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  return (
    <aside aria-label="Product filters sidebar" className="hidden rounded-2xl border border-line bg-surface p-5 lg:block">
      <section>
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Category</h2>
        <ul className="mt-4 space-y-3 text-sm font-bold text-foreground">
          {categories.map((category) => (
            <li className="flex items-center justify-between gap-3" key={category.slug}>
              <span>{category.name}</span><span className="text-muted">{category.count}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-7 border-t border-line pt-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Price range</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs font-bold text-muted">Minimum price
            <input aria-label="Minimum price" className="mt-1 w-full rounded-lg border border-line px-2 py-2 text-sm text-foreground" defaultValue={searchParams.get('minPrice') ?? ''} min="0" onChange={(event) => updateSearch('minPrice', event.target.value)} type="number" />
          </label>
          <label className="text-xs font-bold text-muted">Maximum price
            <input aria-label="Maximum price" className="mt-1 w-full rounded-lg border border-line px-2 py-2 text-sm text-foreground" defaultValue={searchParams.get('maxPrice') ?? ''} min="0" onChange={(event) => updateSearch('maxPrice', event.target.value)} type="number" />
          </label>
        </div>
      </section>
      <section className="mt-7 border-t border-line pt-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Brands</h2>
        <ul className="mt-4 space-y-2">
          {brands.map((brand) => <li key={brand.slug}><button aria-pressed={selectedBrand === brand.slug} className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-sm font-bold text-foreground hover:bg-background" onClick={() => updateSearch('brand', selectedBrand === brand.slug ? '' : brand.slug)} type="button"><span>{brand.name}</span><span aria-hidden="true" className="text-muted">{brand.count}</span></button></li>)}
        </ul>
      </section>
      <section className="mt-7 border-t border-line pt-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Colors</h2>
        <ul className="mt-4 space-y-2">
          {colors.map((color) => <li key={color.name}><button aria-pressed={selectedColor === color.name} className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-sm font-bold text-foreground hover:bg-background" onClick={() => updateSearch('color', selectedColor === color.name ? '' : color.name)} type="button"><span className="flex items-center gap-2"><span aria-hidden="true" className="size-3 rounded-full border border-zinc-300" style={{ backgroundColor: color.hex }} />{color.name}</span><span aria-hidden="true" className="text-muted">{color.count}</span></button></li>)}
        </ul>
      </section>
    </aside>
  )
}
