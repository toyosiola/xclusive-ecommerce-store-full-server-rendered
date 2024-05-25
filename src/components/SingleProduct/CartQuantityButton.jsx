"use client";

import { useFormStatus } from "react-dom";

export default function CartQuantityButton({
  value,
  cartQuantity,
  quantityInStock,
}) {
  const { pending } = useFormStatus();
  const decreaseBtn = value === "decrease";

  return (
    <button
      type="submit"
      name="action"
      value={value}
      disabled={
        pending ||
        (decreaseBtn
          ? cartQuantity <= 1 // disable decrease when quantity is 1
          : cartQuantity >= quantityInStock) //disable increase when quantity is equal to quantity in stock
      }
      className={`h-12 rounded bg-black px-6 text-2xl font-bold duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30 ${decreaseBtn ? "rounded-r-none" : "rounded-l-none"}`}
    >
      {value === "decrease" ? "-" : "+"}
    </button>
  );
}
