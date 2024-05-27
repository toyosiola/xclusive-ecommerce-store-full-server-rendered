"use client";

import { useFormStatus } from "react-dom";

export default function RemoveFromCartButton({ cartQuantity }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`cursor-default rounded pb-1 pl-3 pt-1 text-lg font-semibold italic leading-none text-button2 duration-300 disabled:cursor-not-allowed ${
        cartQuantity
          ? "pointer-events-auto opacity-100 disabled:opacity-60"
          : "pointer-events-none opacity-0"
      }`}
      title="Remove from cart"
      disabled={!cartQuantity || pending}
    >
      remove
    </button>
  );
}
