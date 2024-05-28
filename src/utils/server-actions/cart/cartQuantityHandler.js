"use server";

import Cart from "@/models/CartModel";
import Session from "@/models/SessionModel";
import setCookie from "@/utils/setCookie";
import verifySession from "@/utils/verifySession";
import { revalidateTag } from "next/cache";

export async function cartQuantityHandler(formData) {
  const action = formData.get("action");
  const productId = formData.get("productId");
  let verifiedSession;
  try {
    // check if session  exist and valid
    verifiedSession = await verifySession();
  } catch (error) {
    // handle error thrown during session verification
    return { success: false, message: "An error occurred, please try again" };
  }

  // verifiedSession is null if no session  (not expected scenario here)
  if (!verifiedSession) {
    return { success: false, message: "Failed! Please add item to cart" };
  }

  // handle cart count for not-logged-in user
  if (!verifiedSession.isAuth) {
    let dbSession, cartItem;

    try {
      // find session in db
      dbSession = await Session.findById(
        verifiedSession.sessionId,
        "-createdAt -updatedAt -cart._id -__v",
      ).populate({
        path: "cart.product",
        select: "quantityInStock",
      });

      // if session is not found in db, delete session token (Not an expected scenario)
      if (!dbSession) {
        cookie.delete("session");
        revalidateTag(`cart/session-${verifiedSession.sessionId}`); // cached session cart
        return { success: false, message: "Failed, please try again" };
      }

      // find product in cart
      cartItem = dbSession.cart.find(
        (item) => item.product._id.toString() === productId,
      );

      // handle increase cart quantity for not-logged-in user
      if (action === "increase") {
        // check so intending cart quantity won't go above quantity in stock
        if (cartItem.cartQuantity < cartItem.product.quantityInStock) {
          // look for item in cart array and update count
          dbSession.cart = dbSession.cart.map((item) => {
            if (item.product._id.toString() === productId) {
              item.cartQuantity++;
            }
            return item;
          });
          // save item to db, refresh session, and revalidate
          await dbSession.save();
          setCookie({ sessionId: dbSession._id.toString() });
          revalidateTag(`cart/session-${verifiedSession.sessionId}`); // cached session cart
          return { success: true, message: "Quantity increased" };
        } else {
          // if intending quantity is greater than quantity in stock
          return {
            success: false,
            message: "Can not go beyond quantity in stock",
          };
        }
      }

      // handle decrease cart quantity for not-logged-in user
      if (action === "decrease") {
        // check so intending cart quantity won't go below 1
        if (cartItem.cartQuantity > 1) {
          // look for item in cart array and update count
          dbSession.cart = dbSession.cart.map((item) => {
            if (item.product._id.toString() === productId) {
              item.cartQuantity--;
            }
            return item;
          });
          // save item to db, refresh session, and revalidate
          await dbSession.save();
          setCookie({ sessionId: dbSession._id.toString() });
          revalidateTag(`cart/session-${verifiedSession.sessionId}`);
          return { success: true, message: "Quantity reduced" };
        } else {
          // if intending quantity is less than 1
          return {
            success: false,
            message: "Can not go below 1, you may remove item from your cart",
          };
        }
      }
    } catch (error) {
      return { success: false, message: "An error occurred, please try again" };
    }
  }
  // end of handle cart count for not-logged-in user

  // handle cart count for logged-in user
  if (verifiedSession.isAuth) {
    let cartItem;
    // get item from db
    try {
      cartItem = await Cart.findOne({
        product: productId,
        user: verifiedSession.userId,
      }).populate({
        path: "product",
        select: "quantityInStock",
      });

      // if item is not found in cart
      if (!cartItem)
        return { success: false, message: "Item not in your cart" };

      // handle increase cart quantity for logged-in user
      if (action === "increase") {
        // check so intending cart quantity won't go above quantity in stock
        if (cartItem.cartQuantity < cartItem.product.quantityInStock) {
          cartItem.cartQuantity++;
          await cartItem.save();
          revalidateTag(`cart/user-${verifiedSession.userId}`); // cached session cart
          return { success: true, message: "Quantity increased" };
        } else {
          return {
            success: false,
            message: "Can not go beyond quantity in stock",
          };
        }
      }

      // handle decrease cart quantity for logged-in user
      if (action === "decrease") {
        // check so intending cart quantity won't go below 1
        if (cartItem.cartQuantity > 1) {
          cartItem.cartQuantity--;
          await cartItem.save();
          revalidateTag(`cart/user-${verifiedSession.userId}`); // cached session cart
          return { success: true, message: "Quantity reduced" };
        } else {
          return {
            success: false,
            message: "Can not go below 1, you may remove item from your cart",
          };
        }
      }
    } catch (error) {
      return { success: false, message: "An error occurred, please try again" };
    }
  }
}
