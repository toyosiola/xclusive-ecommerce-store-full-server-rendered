import CartQuantityButton from "./CartQuantityButton";
import { cartQuantityHandler } from "@/utils/server-actions/cart";
import DisplayedQuantity from "./DisplayedQuantity";

export default function CartQuantityForm({
  cartQuantity,
  quantityInStock,
  productId,
}) {
  return (
    <form
      action={cartQuantityHandler}
      className={`absolute left-0 top-0 grid w-full grid-cols-[auto_1fr_auto] text-center text-text ${cartQuantity ? "" : "pointer-events-none opacity-0"}`}
    >
      <input name="productId" type="hidden" value={productId} />
      <CartQuantityButton
        {...{ value: "decrease", cartQuantity, quantityInStock }}
      />

      <DisplayedQuantity cartQuantity={cartQuantity} />

      <CartQuantityButton
        {...{ value: "increase", cartQuantity, quantityInStock }}
      />
    </form>
  );
}
