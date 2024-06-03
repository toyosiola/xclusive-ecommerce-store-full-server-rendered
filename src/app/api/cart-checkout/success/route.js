import { UnauthenticatedError } from "@/errors";
import Cart from "@/models/CartModel";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const stripeSessionId = searchParams.get("session_id");

  try {
    // retrieve stripe session. stripe will throw error if session does not exist
    const stripeSession =
      await stripe.checkout.sessions.retrieve(stripeSessionId);
    // const customer = await stripe.customers.retrieve(stripeSession.id);

    // verify user
    const verifiedSession = await verifySession();
    if (!stripeSession || !verifiedSession?.isAuth) {
      throw new UnauthenticatedError("Not authorized to perform this action");
    }

    //create entry in db
    await connectDB();

    // clear user cart
    await Cart.deleteMany({ user: verifiedSession.userId });
    revalidateTag(`cart/user-${verifiedSession.userId}`); // cached user cart
  } catch (error) {
    console.error("error", error);
    notFound();
  }
  redirect("/cart");
}
