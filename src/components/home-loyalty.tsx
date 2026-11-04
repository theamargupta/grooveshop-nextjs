import Link from 'next/link'

export function HomeLoyalty() {
  return <section className="border-y border-line bg-[#e9f7b8]"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
    <div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-600">Groove rewards</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Every good choice deserves a little back.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-700">Earn points on every order, then use them for future finds.</p></div>
    <Link className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink" href="/products">Explore rewards</Link>
  </div></section>
}
