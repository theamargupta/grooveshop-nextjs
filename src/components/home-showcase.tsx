import Image from 'next/image'
import Link from 'next/link'
import { ProductGrid } from './product-grid'
import type { Product } from '@/lib/types'

const trustBadges = [
  ['↗', 'Free shipping', 'On orders over €50'],
  ['↺', '30 day returns', 'Try it your way'],
  ['✓', '2 year warranty', 'Built to last'],
  ['⌁', 'Secure payment', 'Your data stays safe'],
  ['✦', 'AI-ready', 'Smarter sound, daily'],
]

const categories = [
  ['Audio', 'Immersive sound for everywhere', 'bg-[#efe7fa]'],
  ['Wearables', 'Move in sync with your day', 'bg-[#e2f0ed]'],
  ['Accessories', 'Small upgrades, big difference', 'bg-[#f8ebd9]'],
]

const coupons = [
  ['WELCOME10', '10% off your first order', 'A little hello from us.'],
  ['FREESHIP', 'Free shipping over €50', 'The best things travel free.'],
  ['MOVE15', '15% off wearables', 'For every beat and every step.'],
]

interface HomeShowcaseProps {
  products: Product[]
}

export function HomeShowcase({ products }: HomeShowcaseProps) {
  const [heroProduct] = products
  const popularProducts = products.slice(4, 8)

  return (
    <>
      <section className="mx-auto mt-5 w-full max-w-7xl px-5 sm:mt-8 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-white sm:px-12 sm:py-16 lg:min-h-[31rem] lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-lime">The rhythm of everyday</p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.06em] sm:text-6xl">Feel more of what moves you.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-zinc-300">Thoughtful tech for sound, movement, and a desk setup that feels like yours.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-full bg-lime px-5 py-3 font-extrabold text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Shop all products</Link>
              <Link className="rounded-full border border-white/40 px-5 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products?category=audio">Explore audio</Link>
            </div>
          </div>
          {heroProduct === undefined ? null : <div className="relative mt-10 lg:absolute lg:bottom-0 lg:right-8 lg:mt-0 lg:w-[45%]">
            <div className="absolute left-0 top-4 z-10 rounded-2xl bg-white p-3 text-ink shadow-xl sm:left-8"><p className="text-xs font-bold text-zinc-500">New sound</p><p className="mt-1 text-sm font-extrabold">{heroProduct.name}</p></div>
            <Image alt="" className="ml-auto aspect-square w-full max-w-md rounded-t-[3rem] bg-[#dceaa7] object-cover" height={600} priority sizes="(max-width: 1024px) 100vw, 45vw" src={heroProduct.image} width={600} />
          </div>}
        </div>
      </section>
      <section aria-label="Why shop with us" className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {trustBadges.map(([icon, title, copy]) => <div className="flex items-center gap-3 bg-background px-5 py-5" key={title}><span className="grid size-9 place-items-center rounded-full bg-lime font-extrabold text-ink">{icon}</span><div><p className="text-sm font-extrabold text-ink">{title}</p><p className="text-xs text-zinc-500">{copy}</p></div></div>)}
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">Made for your rhythm</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Shop by category</h2></div><Link className="text-sm font-extrabold text-ink underline decoration-lime decoration-4 underline-offset-4" href="/products">See everything</Link></div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {categories.map(([name, copy, background]) => <Link className={`${background} group rounded-2xl p-6 transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime`} href={`/products?category=${name.toLowerCase()}`} key={name}><span className="grid size-11 place-items-center rounded-full bg-white text-xl font-black text-ink">↗</span><h3 className="mt-12 text-2xl font-extrabold text-ink">{name}</h3><p className="mt-2 text-sm font-medium text-zinc-600">{copy}</p><span className="mt-5 inline-block text-sm font-extrabold text-ink">Shop now →</span></Link>)}
        </div>
      </section>
      <ProductRow eyebrow="Just landed" title="New arrivals" products={products.slice(0, 4)} />
      <ProductRow eyebrow="Crowd favorites" title="Popular right now" products={popularProducts} />
      <section className="mx-auto mb-14 w-full max-w-7xl px-5 sm:px-8"><div className="rounded-3xl bg-ink px-6 py-10 sm:px-10"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Little things, better prices</p><h2 className="mt-2 text-3xl font-extrabold text-white">A few reasons to smile.</h2></div><Link className="rounded-full border border-white/30 px-4 py-2 text-sm font-extrabold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Shop offers</Link></div><div className="mt-7 grid gap-4 md:grid-cols-3">{coupons.map(([code, title, copy]) => <article className="rounded-2xl bg-white p-5 text-ink" key={code}><span className="inline-block rounded-full bg-lime px-2.5 py-1 text-xs font-extrabold tracking-wider">{code}</span><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm text-zinc-600">{copy}</p></article>)}</div></div></section>
      <footer className="bg-[#202024] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_2fr]"><div><p className="text-2xl font-extrabold">Stay in the groove.</p><p className="mt-2 text-sm text-zinc-400">Fresh drops, smarter tech, and offers worth opening.</p><form className="mt-5 flex max-w-md rounded-full bg-white p-1"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input className="min-w-0 flex-1 rounded-full px-4 text-sm text-ink outline-none" id="newsletter-email" placeholder="Email address" type="email" /><button className="rounded-full bg-lime px-4 py-2 text-sm font-extrabold text-ink" type="submit">Join</button></form></div><div className="grid grid-cols-3 gap-5 text-sm"><div><p className="font-extrabold">Shop</p><p className="mt-3 text-zinc-400">Audio</p><p className="mt-2 text-zinc-400">Wearables</p></div><div><p className="font-extrabold">Help</p><p className="mt-3 text-zinc-400">Shipping</p><p className="mt-2 text-zinc-400">Returns</p></div><div><p className="font-extrabold">Payment</p><p className="mt-3 text-zinc-400">Visa · Mastercard</p><span className="mt-4 inline-block rounded-full bg-lime px-2.5 py-1 text-xs font-extrabold text-ink">✦ AI-ready</span></div></div></div></footer>
    </>
  )
}

function ProductRow({ eyebrow, title, products }: { eyebrow: string; title: string; products: Product[] }) {
  return <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8" aria-label={title}><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">{eyebrow}</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{title}</h2><div className="mt-7"><ProductGrid columns={4} products={products} /></div></section>
}
