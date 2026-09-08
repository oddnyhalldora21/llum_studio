import { describe, it, expect } from 'vitest'
import { validateCheckoutForm, type CheckoutFormValues } from './checkoutValidation'

const validValues: CheckoutFormValues = {
  email: 'jane@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'Reykjavik',
  postal: '101',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
}

describe('validateCheckoutForm', () => {
  it('returns no errors for fully valid input', () => {
    expect(validateCheckoutForm(validValues)).toEqual({})
  })

  it('requires email', () => {
    const errors = validateCheckoutForm({ ...validValues, email: '' })
    expect(errors.email).toBe('Email is required')
  })

  it('rejects an invalid email format', () => {
    const errors = validateCheckoutForm({ ...validValues, email: 'not-an-email' })
    expect(errors.email).toBe('Enter a valid email')
  })

  it('requires first and last name', () => {
    const errors = validateCheckoutForm({ ...validValues, firstName: '', lastName: '' })
    expect(errors.firstName).toBe('First name is required')
    expect(errors.lastName).toBe('Last name is required')
  })

  it('requires address, city, and postal code', () => {
    const errors = validateCheckoutForm({ ...validValues, address: '', city: '', postal: '' })
    expect(errors.address).toBe('Address is required')
    expect(errors.city).toBe('City is required')
    expect(errors.postal).toBe('Postal code is required')
  })

  it('requires a card number', () => {
    const errors = validateCheckoutForm({ ...validValues, cardNumber: '' })
    expect(errors.cardNumber).toBe('Card number is required')
  })

  it('rejects a card number shorter than 16 digits', () => {
    const errors = validateCheckoutForm({ ...validValues, cardNumber: '4242 4242' })
    expect(errors.cardNumber).toBe('Enter a valid 16-digit card number')
  })

  it('requires an expiry date', () => {
    const errors = validateCheckoutForm({ ...validValues, expiry: '' })
    expect(errors.expiry).toBe('Expiry is required')
  })

  it('rejects an expiry not in MM/YY format', () => {
    const errors = validateCheckoutForm({ ...validValues, expiry: '2028-12' })
    expect(errors.expiry).toBe('Use MM/YY format')
  })

  it('requires a CVC', () => {
    const errors = validateCheckoutForm({ ...validValues, cvc: '' })
    expect(errors.cvc).toBe('CVC is required')
  })

  it('rejects a CVC shorter than 3 digits', () => {
    const errors = validateCheckoutForm({ ...validValues, cvc: '12' })
    expect(errors.cvc).toBe('Enter a valid CVC')
  })
})