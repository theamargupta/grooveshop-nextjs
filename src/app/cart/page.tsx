'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart/cart-context'
import { formatPrice } from '@/lib/format-price'

export default function CartPage() {
  const { cart, removeItem, updateItem } = useCart()

  if (cart.items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Your cart</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Your cart is empty.</h1>
        <p className="mt-4 text-slate-600">Find something that fits your everyday rhythm.</p>
        <Link className="mt-8 inline-flex rounded-full bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/products">
          Browse products
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Your cart</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Ready when you are.</h1>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_19rem] lg:items-start">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
          {cart.items.map((item) => (
            <li className="flex gap-4 py-5" key={item.productId}>
              <Image alt="" className="h-24 w-24 rounded-xl bg-slate-100 object-cover" height={96} src={item.image} width={96} />
              <div className="min-w-0 flex-1">
                <Link className="font-bold text-slate-950 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href={`/products/${item.slug}`}>
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-slate-600">{formatPrice(item.unitPrice, cart.currency)} each</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div aria-label={`Quantity for ${item.name}`} className="flex items-center rounded-full border border-slate-300">
                    <button aria-label={`Decrease quantity of ${item.name}`} className="px-3 py-1.5 font-bold text-slate-700 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => updateItem(item.productId, item.quantity - 1)} type="button">−</button>
                    <span aria-live="polite" className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button aria-label={`Increase quantity of ${item.name}`} className="px-3 py-1.5 font-bold text-slate-700 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => updateItem(item.productId, item.quantity + 1)} type="button">+</button>
                  </div>
                  <p className="font-bold text-slate-950">{formatPrice(item.lineTotal, cart.currency)}</p>
                </div>
                <button className="mt-3 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => removeItem(item.productId)} type="button">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-black text-slate-950">Order summary</h2>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
            <span className="font-semibold text-slate-700">Subtotal</span>
            <span className="text-xl font-black text-slate-950">{formatPrice(cart.subtotal, cart.currency)}</span>
          </div>
          <Link className="mt-6 flex justify-center rounded-full bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/checkout">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  )
}
