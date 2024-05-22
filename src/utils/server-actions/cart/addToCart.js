"use server";

import { devEnv } from "@/app/layout";
import Cart from "@/models/CartModel";
import Session from "@/models/SessionModel";
import createJWT from "@/utils/createJWT";
import verifySession from "@/utils/verifySession";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function addToCart(productId) {
  const cookie = cookies();
  let verifiedSession;
  // only logged in user can add item to wishlist
  try {
    verifiedSession = await verifySession();
  } catch (error) {
    // handle error thrown during session verification
    return { success: false, message: "An error occurred, please try again" };
  }

  // verifiedSession is null if no session exists
  if (!verifiedSession) {
    try {
      // sessions collection is used to manage cart of users that are not logged in
      const session = await Session.create({
        cart: [{ product: productId, cartQuantity: 1 }],
      });
      const token = createJWT({ sessionId: session._id.toString() });
      cookie.set("session", token, {
        httpOnly: true,
        secure: !devEnv,
        maxAge: Number(process.env.SESSION_LIFETIME),
        sameSite: "Strict",
        path: "/",
      });
      revalidatePath(`products/${productId}`);
      return { success: true, message: "Added to cart" };
    } catch (error) {
      return { success: false, message: "An error occurred, please try again" };
    }
  }

  // verifiedSession.isAuth is false if session exists but user is not logged in
  if (!verifiedSession.isAuth) {
    try {
      const session = await Session.findById(verifiedSession.sessionId);
      session.cart.push({ product: productId, cartQuantity: 1 });
      await session.save();

      if (!session) {
        // if session is not found in db, delete jwt (Not an expected scenario)
        cookie.delete("session");
        return { success: false, message: "Failed, please try again" };
      }

      // refresh session after updating wishlist
      const token = createJWT({ sessionId: session._id.toString() });
      cookie.set("session", token, {
        httpOnly: true,
        secure: !devEnv,
        maxAge: Number(process.env.SESSION_LIFETIME),
        sameSite: "Strict",
        path: "/",
      });
      revalidateTag(`cart/session-${verifiedSession.sessionId}`);
      return { success: true, message: "Added to cart" };
    } catch (error) {
      // error.code 11000 = mongoose duplicate error
      if (error.code && error.code === 11000)
        return { success: false, message: "Product already in cart" };

      return { success: false, message: "An error occurred, please try again" };
    }
  }

  if (verifiedSession.isAuth) {
    try {
      await Cart.create({
        product: productId,
        user: verifiedSession.userId,
        cartQuantity: 1,
      });
      revalidateTag(`cart/user-${verifiedSession.userId}`);
      return { success: true, message: "Added to cart" };
    } catch (error) {
      // error.code 11000 = mongoose duplicate error
      if (error.code && error.code === 11000)
        return { success: false, message: "Product already in cart" };

      return { success: false, message: "An error occurred, please try again" };
    }
  }
}
