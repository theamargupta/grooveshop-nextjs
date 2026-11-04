import Link from 'next/link'

const orderReference = 'GS-2026-1042'

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Order confirmed</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Order placed</h1>
      <p className="mt-4 text-lg text-slate-700">Thanks for shopping with GrooveShop. We&apos;ll be in touch when your order is on its way.</p>
      <p className="mt-6 text-sm font-semibold text-slate-600">Order reference: <span className="text-slate-950">{orderReference}</span></p>
      <Link className="mt-8 inline-flex rounded-full bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" href="/">
        Back to home
      </Link>
    </main>
  )
}
