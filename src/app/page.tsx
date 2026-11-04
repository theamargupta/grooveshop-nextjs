import { HomeBlog } from '@/components/home-blog'
import { HomeCategories } from '@/components/home-categories'
import { HomeCoupon } from '@/components/home-coupon'
import { HomeFaq } from '@/components/home-faq'
import { HomeHero } from '@/components/home-hero'
import { HomeLoyalty } from '@/components/home-loyalty'
import { HomeProductRow } from '@/components/home-product-row'
import { HomeStats } from '@/components/home-stats'
import { HomeTestimonials } from '@/components/home-testimonials'
import { HomeTrust } from '@/components/home-trust'
import { SiteFooter } from '@/components/site-footer'
import { listProducts } from '@/lib/data/products'

export default function Home() {
  const products = listProducts()
  const popularProducts = [...products]
    .sort((left, right) => right.reviewCount - left.reviewCount)
    .slice(0, 4)

  return (
    <main>
      <HomeHero product={products[0]} />
      <HomeTrust />
      <HomeCategories />
      <HomeProductRow eyebrow="Just landed" products={products.slice(0, 4)} title="New arrivals" />
      <HomeProductRow eyebrow="Crowd favorites" products={popularProducts} title="Popular right now" />
      <HomeCoupon />
      <HomeLoyalty />
      <HomeStats />
      <HomeBlog />
      <HomeTestimonials />
      <HomeFaq />
      <SiteFooter />
    </main>
  )
}
