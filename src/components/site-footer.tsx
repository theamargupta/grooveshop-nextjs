import Link from 'next/link'

const columns = [
  ['Shop', [['Shop all products', '/products'], ['Audio', '/products?category=audio'], ['Wearables', '/products?category=wearables'], ['Accessories', '/products?category=accessories']]],
  ['Help', [['Shipping', '/returns'], ['Returns', '/returns'], ['Contact us', '/contact'], ['FAQ', '/about']]],
  ['Follow', [['Instagram', '/products'], ['TikTok', '/products'], ['Pinterest', '/products']]],
] as const

export function SiteFooter() {
  return <footer className="bg-[#202024] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.15fr_1.85fr]">
    <div><Link className="text-2xl font-extrabold" href="/">Stay in the groove.</Link><p className="mt-2 text-sm leading-6 text-zinc-400">Fresh drops, smarter tech, and offers worth opening.</p><form className="mt-5 flex max-w-md rounded-full bg-white p-1"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input className="min-w-0 flex-1 rounded-full px-4 text-sm text-ink outline-none" id="newsletter-email" placeholder="Email address" type="email" /><button className="rounded-full bg-lime px-4 py-2 text-sm font-extrabold text-ink" type="submit">Join</button></form></div>
    <div className="grid grid-cols-3 gap-5 text-sm">{columns.map(([title, links]) => <div key={title}><p className="font-extrabold">{title}</p>{links.map(([label, href]) => <Link className="mt-3 block text-zinc-400 transition hover:text-white" href={href} key={label}>{label}</Link>)}{title === 'Follow' ? <span className="mt-5 inline-block rounded-full bg-lime px-2.5 py-1 text-xs font-extrabold text-ink">✦ AI-ready</span> : null}</div>)}</div>
  </div><div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-5 text-xs text-zinc-500 sm:px-8"><span>© 2026 GrooveShop</span><span>Made for everyday rhythm.</span></div></div></footer>
}
