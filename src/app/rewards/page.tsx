import Link from 'next/link'

const rewards = [
  ['1. Join in', 'Create an account and start collecting points on every order.'],
  ['2. Keep your rhythm', 'Earn one point for every €1 you spend on everyday upgrades.'],
  ['3. Spend your points', 'Use your points for future finds when you are ready.'],
]

export default function RewardsPage() {
  return (
    <main>
      <section className="border-y border-line bg-lime text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em]">Groove rewards</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">Every good choice deserves a little back.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/80">Earn points on every order, then use them for future finds that keep your rhythm moving.</p>
          <Link className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-extrabold text-white transition hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink" href="/products">
            Explore products
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">How it works</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {rewards.map(([step, copy]) => <article className="rounded-2xl border border-line bg-surface p-6 shadow-sm" key={step}><p className="text-sm font-extrabold text-muted">{step}</p><p className="mt-4 text-lg font-extrabold text-foreground">{copy}</p></article>)}
        </div>
      </section>
    </main>
  )
}
