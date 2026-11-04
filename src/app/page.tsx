import Link from 'next/link'
import { ProductGrid } from '@/components/product-grid'
import { listProducts } from '@/lib/data/products'

export default function Home() {
  const featuredProducts = listProducts().slice(0, 4)

  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Better everyday tech</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">Gear that keeps pace with your life.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Purposeful audio, wearables, and desk essentials chosen for your daily rhythm.</p>
          <Link className="mt-8 inline-flex rounded-full bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300" href="/products">
            Shop all products
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="featured-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Start here</p>
            <h2 id="featured-heading" className="mt-2 text-3xl font-black tracking-tight text-slate-950">Featured</h2>
          </div>
          <Link className="text-sm font-bold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/products">View all</Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </main>
  )
}
