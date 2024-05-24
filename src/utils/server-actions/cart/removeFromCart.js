"use server";

import { devEnv } from "@/app/layout";
import Cart from "@/models/CartModel";
import Session from "@/models/SessionModel";
import createJWT from "@/utils/createJWT";
import setCookie from "@/utils/setCookie";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function removeFromCart(productId) {
  const cookie = cookies();
  const session = cookie.get("session")?.value;
  if (!session)
    return { success: false, message: "Error! No item in your cart" };

  let payload;
  try {
    payload = jwt.verify(session, process.env.JWT_SECRET);
  } catch (error) {
    // delete session from client and redirect
    cookie.delete("session");
    return redirect("/login");
  }

  // remove from session cart
  if (payload.sessionId) {
    try {
      const dbSession = await Session.findById(payload.sessionId);
      if (!dbSession) {
        // if session is not found in db, delete jwt (Not an expected scenario)
        cookie.delete("session");
        revalidateTag(`cart/session-${payload.sessionId}`); // cached session cart
        return { success: false, message: "Failed, please try again" };
      }

      dbSession.cart = dbSession.cart.filter(
        (item) => item.product.toString() !== productId,
      );
      if (dbSession.cart.length > 0) {
        await dbSession.save();

        // refresh session after updating cart
        setCookie({ sessionId: dbSession._id.toString() });
        revalidateTag(`cart/session-${payload.sessionId}`); // cached session cart
      } else {
        // if no item again in cart, delete session
        await dbSession.deleteOne();
        cookie.delete("session");
        revalidateTag(`cart/session-${payload.sessionId}`); // purge cached session cart
      }

      return { success: true, message: "Removed from cart" };
    } catch (error) {
      return { success: false, message: "An error occurred! Please try again" };
    }
  }

  // remove from user cart
  try {
    await Cart.deleteOne({ product: productId, user: payload.userId });
    revalidateTag(`cart/user-${payload.userId}`); // cached user cart
    return { success: true, message: "Removed from cart" };
  } catch (error) {
    return { success: false, message: "An error occurred! Please try again" };
  }
}
