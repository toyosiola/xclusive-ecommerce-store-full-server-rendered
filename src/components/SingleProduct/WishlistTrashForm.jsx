"use client";

import { wishlistFormAction } from "@/utils/form-actions";
import WishlistTrashSubmitButton from "./WishlistTrashButton";

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
