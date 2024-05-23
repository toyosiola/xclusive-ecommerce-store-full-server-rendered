"use server";

import Cart from "@/models/CartModel";
import verifySession from "@/utils/verifySession";

export async function cartQuantityHandler(action, productId) {
  let verifiedSession;
  try {
    verifiedSession = await verifySession();
  } catch (error) {
    // handle error thrown during session verification
    return { success: false, message: "An error occurred, please try again" };
  }

  // verifiedSession is null if no session  (noe expected scenario here)
  if (!verifiedSession) {
    return { success: false, message: "Failed! Please add item to cart" };
  }

  // handle cart count for not-logged-in user
  if (!verifiedSession.isAuth) {
    // handle increase session cart quantity for not-logged-in user
    if (action === "increase") {
    }

    // handle decrease session cart quantity for not-logged-in user
    if (action === "decrease") {
    }
  }

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
      if (!cartItem)
        return { success: false, message: "Item not in your cart" };
    } catch (error) {
      return { success: false, message: "An error occurred, please try again" };
    }

    // handle increase cart quantity for logged-in user
    if (action === "increase") {
      // check so intending cart quantity won't go above quantity in stock
      if (cartItem.cartQuantity < cartItem.product.quantityInStock) {
        console.log(cartItem.cartQuantity);
        cartItem.cartQuantity++; // this may not work
        await cartItem.save();
        console.log(cartItem.cartQuantity);
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
        console.log(cartItem.cartQuantity);
        cartItem.cartQuantity--; // this may not work
        await cartItem.save();
        console.log(cartItem.cartQuantity);
        return { success: true, message: "Quantity reduced" };
      } else {
        return {
          success: false,
          message: "Can not go below 1, you may remove item from your cart",
        };
      }
    }
  }
}
