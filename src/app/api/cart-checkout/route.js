import { host } from "@/app/layout";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  let session;
  try {
    // Create Checkout Sessions from body params.
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            // https://docs.stripe.com/api/checkout/sessions/create#create_checkout_session-line_items-price_data
            currency: "usd",
            unit_amount: 2500,
            product_data: {
              name: "T-shirt",
              images: [],
              description: "",
              metadata: { id: "" },
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: host,
      cancel_url: host + "/cart?orderStatus=canceled",
    });
  } catch (err) {
    console.error(err);
    return new Response(err.message || "An error occurred", {
      status: err.statusCode || 500,
    });
  }

  redirect(session.url);
}
