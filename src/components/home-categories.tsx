import Link from 'next/link'

const categories = [
  ['Audio', 'Immersive sound for everywhere', 'bg-[#efe7fa]'],
  ['Wearables', 'Move in sync with your day', 'bg-[#e2f0ed]'],
  ['Accessories', 'Small upgrades, big difference', 'bg-[#f8ebd9]'],
]

export function HomeCategories() {
  return <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
    <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Made for your rhythm</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">Shop by category</h2></div><Link className="text-sm font-extrabold text-foreground underline decoration-lime decoration-4 underline-offset-4" href="/products">See everything</Link></div>
    <div className="mt-7 grid gap-5 md:grid-cols-3">
      {categories.map(([name, copy, background]) => <Link className={`${background} group rounded-2xl p-6 transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime`} href={`/products?category=${name.toLowerCase()}`} key={name}><span className="grid size-11 place-items-center rounded-full bg-white text-xl font-black text-ink">↗</span><h3 className="mt-12 text-2xl font-extrabold text-ink">{name}</h3><p className="mt-2 text-sm font-medium text-zinc-600">{copy}</p><span className="mt-5 inline-block text-sm font-extrabold text-ink">Shop now →</span></Link>)}
    </div>
  </section>
}
