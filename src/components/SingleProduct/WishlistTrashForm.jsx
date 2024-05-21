"use client";

import { wishlistFormAction } from "@/app/products/[productId]/ActionButtons";
import WishlistTrashSubmitButton from "./WishlistTrashSubmitButton";

export default function WishlistTrashForm({
  isWishlistPage,
  isInWishlist,
  id,
}) {
  return (
    <form
      action={() => wishlistFormAction(isInWishlist, id)}
      className="absolute right-3 top-3"
    >
      <WishlistTrashSubmitButton
        isWishlistPage={isWishlistPage}
        isInWishlist={isInWishlist}
      />
    </form>
  );
}
