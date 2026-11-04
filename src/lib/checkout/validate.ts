export interface CheckoutForm {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

const requiredFields: Array<keyof CheckoutForm> = [
  'fullName',
  'email',
  'address',
  'city',
  'postalCode',
  'country',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {}

  for (const field of requiredFields) {
    if (form[field].trim() === '') {
      errors[field] = 'This field is required.'
    }
  }

  if (errors.email === undefined && !emailPattern.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}
