"use client";

import { ChevronRightIcon, IconChevronUp } from "@/assets/icons";
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
      className={`rounded border border-black/30 p-1 text-2xl text-button2 duration-200 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/30 disabled:hover:bg-transparent md:py-0 ${pending ? "disabled:cursor-wait" : ""} ${decreaseBtn ? "rotate-180" : ""}`}
    >
      <ChevronRightIcon className="hidden border md:inline" />
      <IconChevronUp className="border md:hidden" />
    </button>
  );
}
