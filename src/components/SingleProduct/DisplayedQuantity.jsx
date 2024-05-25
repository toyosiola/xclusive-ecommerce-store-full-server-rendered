"use client";

import { useFormStatus } from "react-dom";

export default function DisplayedQuantity({ cartQuantity }) {
  const { pending } = useFormStatus();
  return (
    <p className="grid select-none place-items-center border-y text-2xl font-semibold text-black">
      {!pending ? (
        cartQuantity
      ) : (
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-black/80 border-b-transparent duration-1000"></div> // loading spinner
      )}
    </p>
  );
}
