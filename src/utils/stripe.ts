// utils/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  'pk_test_51RV84FCzC22DhylYWgeOUykuYRqCbiUZG2JJZf3Y63WAknoBfIyDe9FQ5V2lyjjYUBVV4DTKfDzYQZ5mLSNfgE6M001ZavBRCy'
); // Replace this!
