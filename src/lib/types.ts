// Domain types — an honest subset of the GrooveShop OpenAPI schema
// (source-nuxt/openapi/schema.json: Product, Cart, CartItem).
// The storefront UI depends only on these, never on the raw API shapes (Rule 3).

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  /** List price before any discount. */
  price: number
  /** Price actually charged (after discount). */
  finalPrice: number
  /** Original price when on sale, else null. */
  priorPrice: number | null
  /** Whole-number discount percent when on sale, else null. */
  discountPercent: number | null
  /** Public image URL (absolute or /public path). */
  image: string
  stock: number
  categorySlug: string
  categoryName: string
  reviewAverage: number
  reviewCount: number
  /** ISO 4217 code, e.g. "EUR". */
  currency: string
}

export interface CartItem {
  productId: number
  slug: string
  name: string
  image: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  subtotal: number
  currency: string
}

export interface Category {
  slug: string
  name: string
}

export interface ListProductsOptions {
  category?: string
  search?: string
}
