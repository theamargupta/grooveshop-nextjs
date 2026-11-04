import type { Category } from '@/lib/types'

interface ProductSidebarProps {
  categories: Array<Category & { count: number }>
}

export function ProductSidebar({ categories }: ProductSidebarProps) {
  return (
    <aside aria-label="Product filters sidebar" className="hidden rounded-2xl border border-line bg-white p-5 lg:block">
      <section>
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">Category</h2>
        <ul className="mt-4 space-y-3 text-sm font-bold text-zinc-700">
          {categories.map((category) => (
            <li className="flex items-center justify-between gap-3" key={category.slug}>
              <span>{category.name}</span><span className="text-zinc-400">{category.count}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-7 border-t border-line pt-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">Price range</h2>
        <div className="mt-4 h-1 rounded-full bg-zinc-200"><div className="ml-3 h-1 w-3/5 rounded-full bg-ink" /></div>
        <div className="mt-3 flex justify-between text-xs font-bold text-zinc-500"><span>€0</span><span>€400</span></div>
      </section>
      <section className="mt-7 border-t border-line pt-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">Brands</h2>
        <ul className="mt-4 space-y-3 text-sm font-bold text-zinc-700">
          <li>Groove</li><li>Pulse</li><li>Orbit</li>
        </ul>
      </section>
    </aside>
  )
}
