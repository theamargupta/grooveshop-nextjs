import { describe, it, expect } from 'vitest'
import { formatPrice } from './format-price'

describe('formatPrice', () => {
  it('formats a decimal euro amount', () => {
    expect(formatPrice(19.99)).toBe('€19.99')
  })

  it('groups thousands and keeps 2 fraction digits', () => {
    expect(formatPrice(1000)).toBe('€1,000.00')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('€0.00')
  })

  it('honours an explicit currency', () => {
    expect(formatPrice(19.99, 'USD')).toBe('$19.99')
  })

  it('returns an em dash for invalid input instead of throwing', () => {
    expect(formatPrice(Number.NaN)).toBe('—')
    // @ts-expect-error — testing a runtime-invalid input
    expect(formatPrice(null)).toBe('—')
    // @ts-expect-error — testing a runtime-invalid input
    expect(formatPrice(undefined)).toBe('—')
    expect(formatPrice(Infinity)).toBe('—')
  })
})
