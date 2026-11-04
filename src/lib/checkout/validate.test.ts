import { describe, it, expect } from 'vitest'
import { validateCheckout } from './validate'
import type { CheckoutForm } from './validate'

const valid: CheckoutForm = {
  fullName: 'Amar Gupta',
  email: 'amar@example.com',
  address: '12 High Street',
  city: 'Athens',
  postalCode: '10431',
  country: 'GR',
}

describe('validateCheckout', () => {
  it('returns no errors for a complete valid form', () => {
    expect(validateCheckout(valid)).toEqual({})
  })

  it('flags each missing required field', () => {
    const errors = validateCheckout({
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    })
    expect(errors.fullName).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.address).toBeTruthy()
    expect(errors.city).toBeTruthy()
    expect(errors.postalCode).toBeTruthy()
    expect(errors.country).toBeTruthy()
  })

  it('rejects a malformed email', () => {
    expect(validateCheckout({ ...valid, email: 'not-an-email' }).email).toBeTruthy()
  })

  it('treats whitespace-only values as missing', () => {
    expect(validateCheckout({ ...valid, fullName: '   ' }).fullName).toBeTruthy()
  })

  it('does not throw on unexpected extra whitespace in a valid email', () => {
    expect(validateCheckout({ ...valid, email: '  amar@example.com  ' })).toEqual({})
  })
})
