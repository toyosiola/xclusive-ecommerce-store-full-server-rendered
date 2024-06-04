"use client";

import { useFormStatus } from "react-dom";

export default function CartCheckoutBUtton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn2 w-full max-w-none disabled:cursor-wait disabled:opacity-70"
      disabled={pending}
    >
      Proceed to checkout
    </button>
  );
}
