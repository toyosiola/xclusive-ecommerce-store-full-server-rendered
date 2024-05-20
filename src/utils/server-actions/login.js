"use server";

import createJWT from "../createJWT";
import { cookies } from "next/headers";
import verifySession from "../verifySession";
import Session from "@/models/SessionModel";
import Cart from "@/models/CartModel";
import User from "@/models/UserModel";
import { connectDB } from "../db";

export default async function login(formData) {
  const cookie = cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  // validate inputs
  if (!email || !password) {
    return { success: false, message: "Please provide all inputs" };
  }

  await connectDB();
  const user = await User.findOne({ email }).select(
    "firstName password isVerified",
  );
  if (!user) {
    return { success: false, message: "Invalid login credentials!" };
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return { success: false, message: "Invalid login credentials!" };
  }

  // check if user is verified
  if (!user.isVerified) {
    return {
      success: false,
      message: "Please check your email to verify your account",
    };
  }

  // synchronize (not logged in) session cart and saved user cart
  try {
    const session = await verifySession(); // null or object containing sessionId

    // if session token is valid, find session in db
    if (session?.sessionId) {
      let dbSession;
      try {
        dbSession = await Session.findById(session.sessionId);
      } catch (error) {
        console.log("Error occurred syncing cart and sessions cart");
      }

      // if db is found in db,
      if (dbSession && dbSession.cart.length > 1) {
        // compile session products Ids
        const sessionProductsIds = dbSession.cart.map((item) => item.product);

        try {
          // delete from cart collections with id and user
          await Cart.deleteMany({
            product: { $in: sessionProductsIds },
            user: user._id,
          });

          // save session products in cart
          const tempCartProducts = dbSession.cart.map((item) => ({
            ...item,
            user: user._id,
          }));

          const newlyCreatedCart = await Cart.create(tempCartProducts);
          console.log(newlyCreatedCart);
        } catch (error) {
          console.log("Error occurred syncing cart and sessions cart");
        }
      }
    }
  } catch (error) {
    // if session token is invalid
    return { success: false, message: "An error occurred, please try again" };
  }
  // End synchronizing carts here

  // create logged in session token
  const token = createJWT({
    name: user.firstName,
    userId: user._id,
  });

  // use either maxAge (in milliseconds) or expires (in new Date() date format)
  cookie.set("session", token, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.SESSION_LIFETIME),
    sameSite: "strict",
    path: "/",
  });

  return {
    success: true,
    message: "Login successful",
    user: { name: user.firstName },
  };
}
