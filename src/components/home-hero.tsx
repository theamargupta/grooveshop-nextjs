import Image from 'next/image'
import Link from 'next/link'
import { HomeHeroCard } from '@/components/home-hero-card'
import type { Product } from '@/lib/types'

interface HomeHeroProps {
  product: Product | undefined
}

const heroCategories = [
  ['Audio', 'audio'],
  ['Wearables', 'wearables'],
  ['Accessories', 'accessories'],
] as const

export function HomeHero({ product }: HomeHeroProps) {
  return (
    <section className="mx-auto mb-16 mt-5 w-full max-w-7xl px-5 sm:mb-20 sm:mt-8 sm:px-8">
      <div className="relative overflow-visible rounded-[2rem] border border-line bg-surface px-6 pb-28 pt-8 sm:px-10 sm:pb-32 sm:pt-12 lg:px-14 lg:py-16 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="max-w-xl">
            <p className="inline-flex rounded-full bg-lime px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
              The rhythm of everyday
            </p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.065em] text-foreground sm:text-6xl lg:text-7xl">
              Feel more of what moves you.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted">
              Thoughtful tech for sound, movement, and a desk setup that feels like yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-full bg-lime px-5 py-3 font-extrabold text-ink transition hover:bg-[#c7e839] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products">
                Shop now
              </Link>
              <Link className="rounded-full border border-line px-5 py-3 font-extrabold text-foreground transition hover:border-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/products?category=audio">
                Explore audio
              </Link>
            </div>
            <nav aria-label="Shop by category" className="mt-10 flex flex-wrap items-center gap-2">
              {heroCategories.map(([name, slug]) => (
                <Link className="rounded-full border border-line bg-background px-4 py-2 text-sm font-bold text-foreground transition hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" href={`/products?category=${slug}`} key={slug}>
                  {name}
                </Link>
              ))}
              <span className="ml-auto flex gap-2">
                <button aria-label="Previous categories" className="grid size-10 place-items-center rounded-full border border-line text-lg font-bold text-foreground transition hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" type="button">
                  <span aria-hidden="true">←</span>
                </button>
                <button aria-label="Next categories" className="grid size-10 place-items-center rounded-full border border-line text-lg font-bold text-foreground transition hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" type="button">
                  <span aria-hidden="true">→</span>
                </button>
              </span>
            </nav>
          </div>
          {product === undefined ? null : (
            <div className="rounded-[2rem] bg-[#edf2db] p-5 sm:p-8">
              <Image alt={product.name} className="aspect-square w-full rounded-[1.5rem] object-cover" height={700} priority sizes="(max-width: 1024px) 100vw, 50vw" src={product.image} width={700} />
            </div>
          )}
        </div>
        {product === undefined ? null : <HomeHeroCard product={product} />}
      </div>
    </section>
  )
}
