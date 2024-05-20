import "server-only";

import Wishlist from "@/models/WishlistModel";
import { unstable_cache } from "next/cache";

export function getUserWishlist(user) {
  return unstable_cache(
    async () => {
      return await Wishlist.find({ user });
    },
    ["wishlist", user],
    { tags: ["wishlist", `wishlist/user-${user}`] },
  );
}
