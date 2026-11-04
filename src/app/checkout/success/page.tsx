import Link from 'next/link'

const orderReference = 'GS-2026-1042'

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
      <div className="rounded-3xl bg-surface px-6 py-12 shadow-sm ring-1 ring-line sm:px-12">
      <span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-full bg-lime text-2xl font-black text-ink">✓</span>
      <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.18em] text-muted">Order confirmed</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground">Order placed</h1>
      <p className="mt-4 text-lg text-foreground">Thanks for shopping with GrooveShop. We&apos;ll be in touch when your order is on its way.</p>
      <p className="mt-6 text-sm font-bold text-muted">Order reference: <span className="text-foreground">{orderReference}</span></p>
      <Link className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-extrabold text-white hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/">
        Back to home
      </Link>
      </div>
    </main>
  )
}
