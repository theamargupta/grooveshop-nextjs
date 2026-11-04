import { describe, it, expect } from 'vitest'
import { infoPages, type InfoPageContent } from './info'

describe('info pages content', () => {
  const keys = Object.keys(infoPages) as Array<keyof typeof infoPages>

  it('includes the expected legal/info pages', () => {
    for (const key of ['about', 'contact', 'returns', 'privacy', 'terms'] as const) {
      expect(infoPages[key]).toBeDefined()
    }
  })

  it('every page has an eyebrow, title, intro and non-empty sections', () => {
    for (const key of keys) {
      const page: InfoPageContent = infoPages[key]
      expect(page.eyebrow).toBeTruthy()
      expect(page.title).toBeTruthy()
      expect(page.intro).toBeTruthy()
      expect(page.sections.length).toBeGreaterThan(0)
      for (const section of page.sections) {
        expect(section.title).toBeTruthy()
        expect(section.paragraphs.length).toBeGreaterThan(0)
        expect(section.paragraphs.every((p) => p.length > 0)).toBe(true)
      }
    }
  })
})
