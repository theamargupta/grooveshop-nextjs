import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/content/blog'

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (post === undefined) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link className="rounded text-sm font-extrabold text-muted underline decoration-lime decoration-4 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/blog">← The groove journal</Link>
      <article className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-10">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">{post.category}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-base leading-7 text-muted">{post.excerpt}</p>
        <p className="mt-6 border-b border-line pb-6 text-sm font-bold text-muted">{post.publishedAt} · {post.readTime}</p>
        <div className="mt-7 space-y-5 text-base leading-7 text-foreground">
          {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  )
}
