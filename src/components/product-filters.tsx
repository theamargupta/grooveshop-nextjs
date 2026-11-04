'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/lib/types'

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
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
    <section aria-label="Product filters" className="space-y-4">
      <label className="block max-w-md">
        <span className="mb-2 block text-sm font-semibold text-slate-800">Search products</span>
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
          defaultValue={searchParams.get('q') ?? ''}
          onChange={(event) => updateSearch('q', event.target.value)}
          placeholder="Search products"
          type="search"
        />
      </label>
      <div className="flex flex-wrap gap-2" aria-label="Categories">
        <button
          className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selectedCategory === '' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          onClick={() => updateSearch('category', '')}
          type="button"
        >
          All products
        </button>
        {categories.map((category) => (
          <button
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selectedCategory === category.slug ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            key={category.slug}
            onClick={() => updateSearch('category', category.slug)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  )
}
