"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentMethodMessagingElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function KlarnaMessage({ amount }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safeguard: Do not render or query Stripe during Vercel's SSR compilation phase
  if (!mounted || !amount) return null;

  const totalAmount = Math.round(4500);

  return (
    <Elements stripe={stripePromise} key={totalAmount}>
      <PaymentMethodMessagingElement
        options={{
          paymentMethodTypes: ["klarna"],
          amount: totalAmount,
          currency: "USD",
          countryCode: "US", // Prevents Vercel geofencing server IP bugs
        }}
      />
    </Elements>
  );
}
