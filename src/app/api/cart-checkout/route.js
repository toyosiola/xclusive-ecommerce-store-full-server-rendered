import { host } from "@/app/layout";
import { UnauthenticatedError } from "@/errors";
import { getUserCart } from "@/utils/getCart";
import verifySession from "@/utils/verifySession";
import { notFound, redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  let stripeSession;
  try {
    const verifiedSession = await verifySession();

    // if user is not logged-in, throw error
    if (!verifiedSession || !verifiedSession?.isAuth)
      throw new UnauthenticatedError(
        "Checking out unauthorized. Please log in...",
      );

    // get cart items and map to stripe line-items format
    const cart = await getUserCart(verifiedSession.userId, !!"populateProduct");

    // line items is used by stripe. It's an array of each product details
    const line_items = cart.map((item) => {
      const { _id, name, images, price, discount } = item.product;
      // see more details on https://docs.stripe.com/api/checkout/sessions/create
      return {
        quantity: item.cartQuantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.ceil(price - price * (discount || 0)),
          product_data: {
            name,
            images: [images[0]],
            metadata: { id: _id.toString() },
          },
        },
      };
    });

    // products stored in stripe session to be saved in db after successful payment
    const products = JSON.stringify(
      cart.map((item) => {
        const { _id, price, discount, name } = item.product;
        const amountPaid = Math.round(price - price * (discount || 0));
        return {
          product: _id.toString(),
          name,
          markedPrice: price,
          discount,
          amountPaid,
          quantity: item.cartQuantity,
          totalAmountPaid: item.cartQuantity * amountPaid,
        };
      }),
    );

    // Create Checkout Sessions from body params.
    stripeSession = await stripe.checkout.sessions.create({
      line_items, // line_items is an array of products data
      mode: "payment",
      metadata: { userId: verifiedSession.userId.toString(), products },
      success_url: `${host}/api/cart-checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: host + "/cart",
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode === 404) notFound();
    return new Response(err.message || "An error occurred", {
      status: err.statusCode || 500,
    });
  }

  redirect(stripeSession.url);
}
