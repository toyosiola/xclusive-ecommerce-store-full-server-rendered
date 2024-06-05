// stripe redirect to this endpoint after successful payment
import { UnauthenticatedError } from "@/errors";
import Cart from "@/models/CartModel";
import Order from "@/models/OrderModel";
import Product from "@/models/ProductModel";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const stripeSessionId = searchParams.get("session_id");
  const productIdsAndQuantity = JSON.parse(searchParams.get("products")); // array of purchased product ids|quantity

  try {
    let products = {};
    // fill products object with product id and quantity key-value pairs
    productIdsAndQuantity.forEach((item) => {
      const itemArray = item.split("|"); // split id from quantity
      products[itemArray[0]] = itemArray[1];
    });

    // find purchased products from db
    const productsPromise = Product.find(
      { _id: { $in: Object.keys(products) } },
      "price discount name",
    ).exec();

    // retrieve stripe session. Will throw 404 error if session does not exist
    const stripeSession =
      await stripe.checkout.sessions.retrieve(stripeSessionId);

    // verify user
    const verifiedSession = await verifySession();
    if (!stripeSession || !verifiedSession?.isAuth) {
      throw new UnauthenticatedError("Not authorized to perform this action");
    }

    //create entry in db
    const purchasedProducts = await productsPromise;

    const orderedProducts = purchasedProducts.map((item) => {
      const { _id, price, discount, name } = item;
      const unitAmountPaid = Math.round(price - price * (discount || 0));
      const quantityPurchased = Number(products[_id.toString()]);
      return {
        product: _id,
        name,
        markedPrice: price,
        discount,
        unitAmountPaid,
        quantity: quantityPurchased,
        totalAmountPaid: quantityPurchased * unitAmountPaid,
      };
    });

    const { id, metadata, amount_subtotal, amount_total, payment_status } =
      stripeSession;
    const order = Order.create({
      user: metadata.userId,
      orderedProducts,
      orderSubtotal: amount_subtotal,
      orderTotal: amount_total,
      paymentStatus: payment_status,
      stripeSessionId: id,
    });

    // clear user cart
    const cart = Cart.deleteMany({ user: verifiedSession.userId }).exec();
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
