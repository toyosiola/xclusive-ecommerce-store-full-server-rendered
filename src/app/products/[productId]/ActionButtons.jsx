"use client";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/utils/server-actions/wishlist";
import { toast } from "react-toastify";
import WishlistButton from "./WishlistButton";
import {
  addToCart,
  removeFromCart,
  cartQuantityHandler,
} from "@/utils/server-actions/cart";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import QuantityButton from "./QuantityButton";

export async function wishlistFormAction(isInWishlist, id) {
  try {
    if (!isInWishlist) {
      const resp = await addToWishlist(id);
      if (resp.success) return toast.success(resp.message, { autoClose: 1500 });
      return toast.error(resp.message);
    }

    // remove from wishlist
    const resp = await removeFromWishlist(id);
    if (resp.success) return toast.info(resp.message, { autoClose: 1500 });
    toast.error(resp.message);
  } catch (error) {
    toast.error("Failed! Please check your internet connection");
  }
}

export async function addToCartFormAction(cartQuantity, id) {
  try {
    if (!cartQuantity) {
      const resp = await addToCart(id);
      if (resp.success) return toast.success(resp.message, { autoClose: 1500 });
      return toast.error(resp.message);
    }

    // remove from cart
    const resp = await removeFromCart(id);
    if (resp.success) return toast.info(resp.message, { autoClose: 1500 });
    toast.error(resp.message);
  } catch (error) {
    toast.error("Failed! Please check your internet connection");
  }
}

export default function ActionButtons({
  id,
  isInWishlist,
  cartQuantity,
  quantityInStock,
}) {
  const [localCartQuantity, setLocalCartQuantity] = useState(1);

  // cart quantity form handler
  async function countFormAction(formData) {
    const action = formData.get("action");

    // update local quantity if item has not been added to cart
    if (!cartQuantity) {
      action === "increase"
        ? setLocalCartQuantity((prev) =>
            prev < quantityInStock ? prev + 1 : quantityInStock,
          )
        : setLocalCartQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
    } else {
      // update quantity in db if item is in cart
      const resp = await cartQuantityHandler(action, id);
      console.log(resp);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 lg:justify-between">
      <form action={countFormAction} className="flex items-center">
        {/* reduce quantity button */}
        <QuantityButton value="decrease" />

        {/* quantity */}
        <p className="flex h-11 w-20 items-center justify-center border-y border-black/50 text-center text-xl">
          {cartQuantity || localCartQuantity}
        </p>

        {/* increase quantity button */}
        <QuantityButton value="increase" />
      </form>

      {/* add to cart button */}
      <form action={() => addToCartFormAction(cartQuantity, id)}>
        <AddToCartButton cartQuantity={cartQuantity} />
      </form>

      {/* add to wishlist */}
      <form action={() => wishlistFormAction(isInWishlist, id)}>
        <WishlistButton isInWishlist={isInWishlist} />
      </form>
    </div>
  );
}
