import Link from 'next/link'

const coupons = [
  ['WELCOME10', '10% off your first order', 'A little hello from us.'],
  ['FREESHIP', 'Free shipping over €50', 'The best things travel free.'],
  ['MOVE15', '15% off wearables', 'For every beat and every step.'],
]

export function HomeCoupon() {
  return <section className="mx-auto mb-14 w-full max-w-7xl px-5 sm:px-8"><div className="rounded-3xl bg-ink px-6 py-10 sm:px-10">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Little things, better prices</p><h2 className="mt-2 text-3xl font-extrabold text-white">A few reasons to smile.</h2></div><Link className="rounded-full border border-white/30 px-4 py-2 text-sm font-extrabold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Shop offers</Link></div>
    <div className="mt-7 grid gap-4 md:grid-cols-3">{coupons.map(([code, title, copy]) => <article className="rounded-2xl bg-white p-5 text-ink" key={code}><span className="inline-block rounded-full bg-lime px-2.5 py-1 text-xs font-extrabold tracking-wider">{code}</span><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm text-zinc-600">{copy}</p></article>)}</div>
  </div></section>
}
