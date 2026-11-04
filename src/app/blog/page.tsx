import Link from 'next/link'
import { blogPosts } from '@/lib/content/blog'

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">The groove journal</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Stories for your everyday.</h1>
      <p className="mt-3 max-w-2xl text-muted">Small ideas for work, movement, sound, and making useful routines feel a little lighter.</p>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article className="rounded-2xl border border-line bg-surface p-6 shadow-sm" key={post.slug}>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{post.category}</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
            <p className="mt-5 text-xs font-bold text-muted">{post.publishedAt} · {post.readTime}</p>
            <Link className="mt-5 inline-block rounded font-extrabold text-foreground underline decoration-lime decoration-4 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href={`/blog/${post.slug}`}>
              Read article
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
