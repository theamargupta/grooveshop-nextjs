import Link from 'next/link'

const stories = [
  ['Sound', 'How to build a better focus playlist', 'Small rituals for days that need a little more flow.'],
  ['Guides', 'The desk reset that changes everything', 'Five useful upgrades that make work feel lighter.'],
  ['Movement', 'Make your morning walk a ritual', 'Tiny tech, fresh air, and a soundtrack you love.'],
]

export function HomeBlog() {
  return <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">The groove journal</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">Stories for your everyday.</h2></div><Link className="text-sm font-extrabold text-foreground underline decoration-lime decoration-4 underline-offset-4" href="/products">Read the journal</Link></div>
    <div className="mt-7 grid gap-5 md:grid-cols-3">{stories.map(([tag, title, copy], index) => <article className="overflow-hidden rounded-2xl border border-line bg-surface" key={title}><div className={`h-36 ${['bg-[#efe7fa]', 'bg-[#e2f0ed]', 'bg-[#f8ebd9]'][index]} p-5`}><span className="grid size-10 place-items-center rounded-full bg-surface text-xl font-extrabold text-foreground">↗</span></div><div className="p-5"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{tag}</p><h3 className="mt-2 text-xl font-extrabold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p><Link className="mt-4 inline-block text-sm font-extrabold text-foreground" href="/products">Read more →</Link></div></article>)}</div>
  </section>
}
