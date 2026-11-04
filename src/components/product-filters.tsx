'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/lib/types'

interface ProductFiltersProps {
  categories: Array<Category & { count?: number }>
  totalCount?: number
}

export function ProductFilters({ categories, totalCount }: ProductFiltersProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateSearch = useCallback((name: 'category' | 'q', value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  const selectedCategory = searchParams.get('category') ?? ''

  return (
    <section aria-label="Product filters" className="space-y-5">
      <label className="block max-w-lg">
        <span className="mb-2 block text-sm font-extrabold text-ink">Search products</span>
        <input
          className="w-full rounded-full border border-line bg-white px-5 py-3 text-ink outline-none transition placeholder:text-zinc-400 focus:border-ink focus:ring-2 focus:ring-lime"
          defaultValue={searchParams.get('q') ?? ''}
          onChange={(event) => updateSearch('q', event.target.value)}
          placeholder="Search products"
          type="search"
        />
      </label>
      <div className="flex flex-wrap gap-2" aria-label="Categories">
        <button
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${selectedCategory === '' ? 'bg-ink text-white' : 'bg-white text-zinc-600 ring-1 ring-line hover:bg-zinc-100'}`}
          onClick={() => updateSearch('category', '')}
          type="button"
        >
          <span>All products</span>{totalCount === undefined ? null : <span aria-hidden="true" className="ml-1.5 text-xs opacity-70">{totalCount}</span>}
        </button>
        {categories.map((category) => (
          <button
            className={`rounded-full px-4 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${selectedCategory === category.slug ? 'bg-ink text-white' : 'bg-white text-zinc-600 ring-1 ring-line hover:bg-zinc-100'}`}
            key={category.slug}
            onClick={() => updateSearch('category', category.slug)}
            type="button"
          >
            <span>{category.name}</span>{category.count === undefined ? null : <span aria-hidden="true" className="ml-1.5 text-xs opacity-70">{category.count}</span>}
          </button>
        ))}
      </div>
    </section>
  )
}
