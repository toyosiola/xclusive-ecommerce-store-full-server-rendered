// stripe redirect to this endpoint after successful payment
import { UnauthenticatedError } from "@/errors";
import Cart from "@/models/CartModel";
import Order from "@/models/OrderModel";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const stripeSessionId = searchParams.get("session_id");

  try {
    // retrieve stripe session. Will throw 404 error if session does not exist
    const stripeSession =
      await stripe.checkout.sessions.retrieve(stripeSessionId);

    // verify user
    const verifiedSession = await verifySession();
    if (!stripeSession || !verifiedSession?.isAuth) {
      throw new UnauthenticatedError("Not authorized to perform this action");
    }

    //create entry in db
    await connectDB();
    const { id, metadata, amount_subtotal, amount_total, payment_status } =
      stripeSession;
    const order = Order.create({
      user: metadata.userId,
      orderedProducts: JSON.parse(metadata.products),
      orderSubtotal: amount_subtotal,
      orderTotal: amount_total,
      paymentStatus: payment_status,
      stripeSessionId: id,
    });

    // clear user cart
    const cart = Cart.deleteMany({ user: verifiedSession.userId });
    await Promise.all([order, cart]);

    // revalidate cached user cart
    revalidateTag(`cart/user-${verifiedSession.userId}`);
  } catch (error) {
    if (error.statusCode === 404) notFound();
    if (error.statusCode === 401) redirect("/login");
    return new Response(error.message || "An error occurred!", {
      status: error.statusCode || 500,
    });
  }
  redirect("/cart/order-successful");
}
