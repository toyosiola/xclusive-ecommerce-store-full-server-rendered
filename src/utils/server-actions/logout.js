"use server";

import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
const { cookies } = require("next/headers");
const { redirect } = require("next/navigation");

export default async function logout() {
  const cookie = cookies();
  const session = cookie.get("session")?.value;

  if (!session) redirect("/login"); // incase user double clicked logout

  // purge cached user on logout
  try {
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    revalidateTag(`users/${payload.userId}`); // cached user for session verification
    revalidateTag(`wishlist/user-${payload.userId}`); // cached user wishlist
    revalidateTag(`cart/user-${payload.userId}`); // cached user cart
  } catch (error) {
    console.error(error);
  }
  // delete session from client and redirect
  cookie.delete("session");
  redirect("/login");
}
