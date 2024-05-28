"use client";

import { cartFormAction } from "@/utils/form-actions";
import RemoveFromCartButton from "./RemoveFromCartButton";

export default function RemoveFromCartForm({ productId }) {
  return (
    <form action={() => cartFormAction(true, productId)}>
      <RemoveFromCartButton />
    </form>
  );
}
