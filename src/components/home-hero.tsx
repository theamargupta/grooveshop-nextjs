import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface HomeHeroProps {
  product: Product | undefined
}

export function HomeHero({ product }: HomeHeroProps) {
  return (
    <section className="mx-auto mt-5 w-full max-w-7xl px-5 sm:mt-8 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-white sm:px-12 sm:py-16 lg:min-h-[34rem] lg:py-20">
        <div className="relative z-10 max-w-xl">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-lime">The rhythm of everyday</p>
          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.06em] sm:text-6xl">Feel more of what moves you.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-zinc-300">Thoughtful tech for sound, movement, and a desk setup that feels like yours.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-lime px-5 py-3 font-extrabold text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">Shop now</Link>
            <Link className="rounded-full border border-white/40 px-5 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products?category=audio">Explore audio</Link>
          </div>
        </div>
        {product === undefined ? null : (
          <div className="relative mt-10 lg:absolute lg:bottom-0 lg:right-8 lg:mt-0 lg:w-[45%]">
            <div className="absolute left-0 top-4 z-10 rounded-2xl bg-white p-3 text-ink shadow-xl sm:left-8"><p className="text-xs font-bold text-zinc-500">New sound</p><p className="mt-1 text-sm font-extrabold">{product.name}</p></div>
            <Image alt={product.name} className="ml-auto aspect-square w-full max-w-md rounded-t-[3rem] bg-[#dceaa7] object-cover" height={600} priority sizes="(max-width: 1024px) 100vw, 45vw" src={product.image} width={600} />
          </div>
        )}
      </div>
    </section>
  )
}
