"use client";

import { useFormStatus } from "react-dom";

export default function AddToCartButton({ isWishlistPage, cartQuantity }) {
  const { pending } = useFormStatus();
  // cartQuantity true means item is in cart
  return (
    <button
      className={`mt-2 grid h-12 w-full place-items-center rounded bg-black py-3 text-center text-text duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${!isWishlistPage && cartQuantity ? "pointer-events-none opacity-0" : ""}`} //don't display when product is in cart and page is not wishlist page
      disabled={pending || (isWishlistPage && cartQuantity)}
    >
      {!pending ? ( // display spinner when form is submitting
        isWishlistPage && cartQuantity ? (
          "Added to Cart"
        ) : (
          "Add to Cart"
        )
      ) : (
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-white border-b-transparent duration-1000"></div>
      )}
    </button>
  );
}
