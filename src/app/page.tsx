import { HomeShowcase } from '@/components/home-showcase'
import { listProducts } from '@/lib/data/products'

export default function Home() {
  const products = listProducts()

  return (
    <main><HomeShowcase products={products} /></main>
  )
}
