const badges = [
  ['↗', 'Free shipping', 'On orders over €50'],
  ['↺', '30 day returns', 'Try it your way'],
  ['✓', '2 year warranty', 'Built to last'],
  ['⌁', 'Secure payment', 'Your data stays safe'],
  ['✦', 'AI-ready', 'Smarter sound, daily'],
]

export function HomeTrust() {
  return <section aria-label="Why shop with us" className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
    {badges.map(([icon, title, copy]) => <div className="flex items-center gap-3 bg-background px-5 py-5" key={title}><span className="grid size-9 place-items-center rounded-full bg-lime font-extrabold text-ink">{icon}</span><div><p className="text-sm font-extrabold text-ink">{title}</p><p className="text-xs text-zinc-500">{copy}</p></div></div>)}
  </section>
}
