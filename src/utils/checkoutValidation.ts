export type CheckoutFormValues = {
    email: string
    firstName: string
    lastName: string
    address: string
    city: string
    postal: string
    cardNumber: string
    expiry: string
    cvc: string
  }
  
  export function validateCheckoutForm(values: CheckoutFormValues): Record<string, string> {
    const errors: Record<string, string> = {}
  
    if (!values.email) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email'
  
    if (!values.firstName) errors.firstName = 'First name is required'
    if (!values.lastName) errors.lastName = 'Last name is required'
    if (!values.address) errors.address = 'Address is required'
    if (!values.city) errors.city = 'City is required'
    if (!values.postal) errors.postal = 'Postal code is required'
  
    if (!values.cardNumber) errors.cardNumber = 'Card number is required'
    else if (values.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Enter a valid 16-digit card number'
  
    if (!values.expiry) errors.expiry = 'Expiry is required'
    else if (!/^\d{2}\/\d{2}$/.test(values.expiry)) errors.expiry = 'Use MM/YY format'
  
    if (!values.cvc) errors.cvc = 'CVC is required'
    else if (values.cvc.length < 3) errors.cvc = 'Enter a valid CVC'
  
    return errors
  }