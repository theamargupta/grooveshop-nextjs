import type { InfoPageContent } from './info'

export function InfoPage({ content }: { content: InfoPageContent }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-muted">{content.eyebrow}</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{content.title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted">{content.intro}</p>
      <div className="mt-10 space-y-5">
        {content.sections.map((section) => (
          <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm" key={section.title}>
            <h2 className="text-xl font-extrabold text-foreground">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p className="mt-3 leading-7 text-muted" key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </div>
    </main>
  )
}
