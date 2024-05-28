"use client";

import { cartFormAction } from "@/utils/form-actions";
import AddToCartButton from "./AddToCartButton";

export default function AddToCartForm({
  cartQuantity,
  productId,
  isWishlistPage,
}) {
  return (
    <form action={() => cartFormAction(cartQuantity, productId, 1)}>
      <AddToCartButton {...{ cartQuantity, isWishlistPage }} />
    </form>
  );
}
