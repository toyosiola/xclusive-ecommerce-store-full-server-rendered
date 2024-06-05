import "server-only";

import Wishlist from "@/models/WishlistModel";
import { unstable_cache } from "next/cache";

export function getUserWishlist(user, populateProduct = false) {
  return unstable_cache(
    async () => {
      const wishlist = Wishlist.find(
        { user },
        "-createdAt -updatedAt -_id",
      ).sort({ createdAt: -1 });
      if (populateProduct)
        wishlist.populate({
          path: "product",
          select:
            "name images averageRating reviewsCount price newProduct discount quantityInStock",
        });

      return (await wishlist).map((item) => item.toObject());
    },
    ["wishlist", user, populateProduct],
    { tags: ["wishlist", `wishlist/user-${user}`] },
  )();
}
