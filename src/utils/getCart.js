import "server-only";

import { unstable_cache } from "next/cache";
import Cart from "@/models/CartModel";
import Session from "@/models/SessionModel";

export function getUserCart(user, isCartPage = false) {
  return unstable_cache(
    async () => {
      const cart = Cart.find({ user }, "-createdAt -updatedAt").sort({
        createdAt: -1,
      });
      if (isCartPage)
        cart.populate({
          path: "product",
          select: "name images price discount quantityInStock",
        });

      return (await cart).map((item) => item.toObject());
    },
    ["user-cart", user, isCartPage],
    { tags: ["cart", "user-cart", `cart/user-${user}`] },
  )();
}

export function getSessionCart(sessionId, isCartPage = false) {
  return unstable_cache(
    async () => {
      const session = Session.findOne(
        { _id: sessionId },
        "-createdAt -updatedAt -cart._id",
      ).sort({ createdAt: -1 });
      if (isCartPage)
        session.populate({
          path: "cart.product",
          select: "name images price discount quantityInStock",
        });
      return (await session)?.toObject().cart;
    },
    ["session-cart", sessionId, isCartPage],
    { tags: ["cart", "session-cart", `cart/session-${sessionId}`] },
  )();
}
