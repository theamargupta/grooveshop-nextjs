const testimonials = [
  ['“The headphones became part of my morning before I even noticed.”', 'Mina P.', 'Orbit Pro Headphones'],
  ['“Everything feels intentional, from the packaging to the little details.”', 'Jonas R.', 'Charge Dock Duo'],
  ['“A useful upgrade that also makes my desk look much calmer.”', 'Elena K.', 'Signal USB-C Hub'],
]

export function HomeTestimonials() {
  return <section className="bg-ink py-14 text-white"><div className="mx-auto w-full max-w-7xl px-5 sm:px-8"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Loved in the everyday</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight">Real routines. Real favorites.</h2>
    <div className="mt-7 grid gap-5 md:grid-cols-3">{testimonials.map(([quote, name, product]) => <figure className="rounded-2xl bg-white/10 p-6" key={name}><blockquote className="text-lg font-bold leading-7">{quote}</blockquote><figcaption className="mt-7 text-sm text-zinc-300"><span className="font-extrabold text-white">{name}</span><span className="block mt-1">{product}</span></figcaption></figure>)}</div>
  </div></section>
}
