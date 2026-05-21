"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentMethodMessagingElement,
} from "@stripe/react-stripe-js";

// Initialize Stripe outside of the render lifecycle
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function KlarnaMessage({ amount }) {
  // Ensure we don't pass null/undefined to Stripe or it will break rendering
  const totalAmount = amount ? Math.round(amount) : 0;

  return (
    // 1. The Elements context wrapper is mandatory
    // 2. Passing a unique 'key' forces the element to update smoothly when changing variants
    <Elements stripe={stripePromise} key={totalAmount}>
      <PaymentMethodMessagingElement
        options={{
          paymentMethodTypes: ["klarna"],
          amount: totalAmount, // must be an integer in cents (e.g. 4500 for $45.00)
          currency: "USD",
          countryCode: "US", // 💡 Recommended for Vercel: bypasses server region mismatches
        }}
      />
    </Elements>
  );
}
