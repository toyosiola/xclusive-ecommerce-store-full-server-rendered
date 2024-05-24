"use client";

import WishlistButton from "./WishlistButton";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import QuantityButton from "./QuantityButton";
import {
  cartFormAction,
  countFormAction,
  wishlistFormAction,
} from "@/utils/form-actions";
import DisplayedCartQuantity from "./DisplayedCartQuantity";

export default function ActionButtons({
  id,
  isInWishlist,
  cartQuantity, //cartQuantity is the quantity in db, only true if item is in cart
  quantityInStock,
}) {
  const [localCartQuantity, setLocalCartQuantity] = useState(1);

  const displayedQuantity = cartQuantity || localCartQuantity;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <form
        action={(formData) =>
          countFormAction({
            formData,
            productId: id,
            cartQuantity,
            quantityInStock,
            setLocalCartQuantity,
          })
        }
        className="flex items-center"
      >
        {/* reduce quantity button */}
        <QuantityButton value="decrease" {...{ displayedQuantity }} />

        {/* quantity */}
        <DisplayedCartQuantity {...{ displayedQuantity }} />

        {/* increase quantity button */}
        <QuantityButton
          value="increase"
          {...{ displayedQuantity, quantityInStock }}
        />
      </form>

      {/* add to cart button */}
      <form action={() => cartFormAction(cartQuantity, id, localCartQuantity)}>
        <AddToCartButton cartQuantity={cartQuantity} />
      </form>

      {/* add to wishlist */}
      <form action={() => wishlistFormAction(isInWishlist, id)}>
        <WishlistButton isInWishlist={isInWishlist} />
      </form>
    </div>
  );
}
