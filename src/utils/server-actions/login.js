"use server";

import verifySession from "../verifySession";
import Session from "@/models/SessionModel";
import Cart from "@/models/CartModel";
import User from "@/models/UserModel";
import { connectDB } from "../db";
import setCookie from "../setCookie";

export default async function login(formData) {
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

  // synchronize session cart and user cart. session is used to hold cart for users not logged in
  try {
    const session = await verifySession(); // null or object containing sessionId

    // if session token is valid, find session in db
    if (session?.sessionId) {
      let dbSession;
      try {
        dbSession = await Session.findById(
          session.sessionId,
          "-createdAt -updatedAt -cart._id -__v",
        );
      } catch (error) {
        console.log("Error occurred syncing cart and sessions cart");
      }

      // if db is found in db,
      if (dbSession && dbSession?.cart.length > 0) {
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
            product: item.product,
            user: user._id,
            cartQuantity: item.cartQuantity,
          }));

          await Cart.create(tempCartProducts);
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
  setCookie({
    name: user.firstName,
    userId: user._id,
  });

  return {
    success: true,
    message: "Login successful",
    user: { name: user.firstName },
  };
}
