import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoPage } from './info-page'
import type { InfoPageContent } from './info'

const content: InfoPageContent = {
  eyebrow: 'About GrooveShop',
  title: 'Everyday tech for your rhythm.',
  intro: 'A considered edit of useful gear.',
  sections: [
    { title: 'Made for real days', paragraphs: ['Clear sound and reliable power.', 'A little more ease.'] },
    { title: 'Keep it moving', paragraphs: ['Start with one upgrade.'] },
  ],
}

describe('InfoPage', () => {
  it('renders the eyebrow, title and intro', () => {
    render(<InfoPage content={content} />)
    expect(screen.getByText('About GrooveShop')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: content.title })).toBeInTheDocument()
    expect(screen.getByText(content.intro)).toBeInTheDocument()
  })

  it('renders every section title and paragraph', () => {
    render(<InfoPage content={content} />)
    for (const section of content.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title })).toBeInTheDocument()
      for (const paragraph of section.paragraphs) {
        expect(screen.getByText(paragraph)).toBeInTheDocument()
      }
    }
  })
})
