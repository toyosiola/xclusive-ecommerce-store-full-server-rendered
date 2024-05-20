"use server";

import Wishlist from "@/models/WishlistModel";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function removeFromWishlist(productId) {
  const cookie = cookies();
  const session = cookie.get("session")?.value;
  let payload;
  try {
    payload = jwt.verify(session, process.env.JWT_SECRET);
  } catch (error) {
    // delete session from client and redirect
    cookie.delete("session");
    return redirect("/login");
  }

  try {
    await Wishlist.deleteOne({ product: productId, user: payload.userId });
    revalidateTag(`wishlist/user-${payload.userId}`); // cached user wishlist
    return { success: true, message: "Removed from wishlist" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred! Please try again" };
  }
}
