import "server-only";

import { unstable_cache } from "next/cache";
import Cart from "@/models/CartModel";
import Session from "@/models/SessionModel";

export function getUserCart(user) {
  return unstable_cache(
    async () => {
      return await Cart.find({ user }, "-createdAt -updatedAt");
    },
    ["user-cart", user],
    { tags: ["cart", "user-cart", `cart/user-${user}`] },
  )();
}

export function getSessionCart(sessionId) {
  console.log("invoking get cart");
  return unstable_cache(
    async () => {
      console.log("get cart cache miss");
      return (
        await Session.findOne({ _id: sessionId }, "-createdAt -updatedAt")
      )?.cart;
    },
    ["session-cart", sessionId],
    { tags: ["cart", "session-cart", `cart/session-${sessionId}`] },
  )();
}
