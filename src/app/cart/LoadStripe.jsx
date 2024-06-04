"use client";

import { loadStripe } from "@stripe/stripe-js";

// create Stripe object
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function LoadStripe() {
  return <></>;
}
