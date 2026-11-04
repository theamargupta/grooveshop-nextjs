'use client'

import { useState } from 'react'

const questions = [
  ['How long does delivery take?', 'Most orders arrive within 2–4 business days.'],
  ['Can I return something that is not right for me?', 'Yes. Send it back within 30 days in its original condition.'],
  ['Is there a warranty on devices?', 'Every device comes with a two-year warranty for everyday peace of mind.'],
  ['How do Groove rewards work?', 'You earn points with every order and can spend them on a future purchase.'],
]

export function HomeFaq() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8"><div className="text-center"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-zinc-500">Need to know</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">A few quick answers.</h2></div>
    <div className="mt-7 divide-y divide-line rounded-2xl border border-line bg-white">{questions.map(([question, answer]) => { const isOpen = openQuestion === question; return <div key={question}><button aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-extrabold text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lime" onClick={() => setOpenQuestion(isOpen ? null : question)} type="button"><span>{question}</span><span aria-hidden="true" className="text-xl">{isOpen ? '−' : '+'}</span></button>{isOpen ? <p className="px-5 pb-5 text-sm leading-6 text-zinc-600">{answer}</p> : null}</div> })}</div>
  </section>
}
