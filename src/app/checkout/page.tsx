'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/lib/cart/cart-context'
import { type CheckoutForm, validateCheckout } from '@/lib/checkout/validate'
import { formatPrice } from '@/lib/format-price'

const initialForm: CheckoutForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
}

const fields: Array<{ name: keyof CheckoutForm; label: string; type?: 'email' | 'text' }> = [
  { name: 'fullName', label: 'Full name' },
  { name: 'email', label: 'Email address', type: 'email' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'postalCode', label: 'Postal code' },
  { name: 'country', label: 'Country' },
]

export default function CheckoutPage() {
  const { cart, clear } = useCart()
  const router = useRouter()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})

  function updateField(name: keyof CheckoutForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validateCheckout(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    clear()
    router.push('/checkout/success')
  }

  if (cart.items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Checkout</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Your cart is empty.</h1>
        <p className="mt-4 text-slate-600">Add an item before starting checkout.</p>
        <Link className="mt-8 inline-flex rounded-full bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/products">
          Browse products
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Checkout</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Where should we send it?</h1>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_19rem] lg:items-start">
        <form className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" noValidate onSubmit={submitOrder}>
          <h2 className="text-xl font-black text-slate-950">Delivery address</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((field) => {
              const error = errors[field.name]
              const inputId = `checkout-${field.name}`
              const errorId = `${inputId}-error`

              return (
                <div className={field.name === 'address' ? 'sm:col-span-2' : undefined} key={field.name}>
                  <label className="block text-sm font-bold text-slate-800" htmlFor={inputId}>{field.label}</label>
                  <input
                    aria-describedby={error === undefined ? undefined : errorId}
                    aria-invalid={error === undefined ? undefined : true}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    id={inputId}
                    name={field.name}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    type={field.type ?? 'text'}
                    value={form[field.name]}
                  />
                  {error === undefined ? null : <p className="mt-1 text-sm font-medium text-rose-700" id={errorId}>{error}</p>}
                </div>
              )
            })}
          </div>
          <button className="mt-8 w-full rounded-full bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" type="submit">
            Place order
          </button>
        </form>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-black text-slate-950">Order summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {cart.items.map((item) => (
              <li className="flex items-start justify-between gap-3" key={item.productId}>
                <span className="text-slate-700">{item.name} <span className="text-slate-500">× {item.quantity}</span></span>
                <span className="shrink-0 font-semibold text-slate-950">{formatPrice(item.lineTotal, cart.currency)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
            <span className="font-semibold text-slate-700">Subtotal</span>
            <span className="text-xl font-black text-slate-950">{formatPrice(cart.subtotal, cart.currency)}</span>
          </div>
        </aside>
      </div>
    </main>
  )
}
