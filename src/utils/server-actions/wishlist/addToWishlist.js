"use server";

import Wishlist from "@/models/WishlistModel";
import verifySession from "@/utils/verifySession";
import { revalidateTag } from "next/cache";

export default async function addToWishlist(productId) {
  let verifiedSession;
  // only logged in user can add item to wishlist
  try {
    verifiedSession = await verifySession();
  } catch (error) {
    // handle error thrown during session verification
    if (error.statusCode === 401 || error.statusCode === 404)
      return {
        success: false,
        message: "Please login to add product to your wishlist",
      };

    return { success: false, message: "An error occurred, please try again" };
  }

  // if user is not authenticated
  if (!verifiedSession?.isAuth)
    return {
      success: false,
      message: "Please login to add item to your wishlist",
    };

  // if user is authenticated
  try {
    await Wishlist.create({
      product: productId,
      user: verifiedSession.userId,
    });
    // revalidate cached user wishlist
    revalidateTag(`wishlist/user-${verifiedSession.userId}`);
    return { success: true, message: "Added to wishlist" };
  } catch (error) {
    // error 11000 === mongoose duplicate error
    if (error.code && error.code === 11000)
      return { success: false, message: "Product already in wishlist" };

    return { success: false, message: "An error occurred, please try again" };
  }
}
