const stats = [
  ['24h', 'Dispatch on in-stock orders'],
  ['4.8/5', 'From thousands of reviews'],
  ['30 days', 'To try it your way'],
  ['2 years', 'Warranty on every device'],
]

export function HomeStats() {
  return <section aria-label="GrooveShop by the numbers" className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
    {stats.map(([value, copy]) => <div className="bg-background px-5 py-9 text-center" key={value}><p className="text-3xl font-extrabold tracking-tight text-ink">{value}</p><p className="mt-2 text-sm font-medium text-zinc-600">{copy}</p></div>)}
  </section>
}
