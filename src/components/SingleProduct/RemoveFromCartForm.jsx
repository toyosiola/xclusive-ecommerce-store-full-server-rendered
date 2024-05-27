"use client";

import { cartFormAction } from "@/utils/form-actions";
import RemoveFromCartButton from "./RemoveFromCartButton";

export default function RemoveFromCartForm({ productId, cartQuantity }) {
  return (
    <form
      action={() => cartFormAction(true, productId)}
      className={`absolute -top-9 right-0 ${cartQuantity ? "" : "-z-10"}`}
    >
      <RemoveFromCartButton cartQuantity={cartQuantity} />
    </form>
  );
}
