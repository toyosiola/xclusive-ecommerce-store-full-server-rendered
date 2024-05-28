import CartQuantityButton from "./CartQuantityButton";
import { cartQuantityHandler } from "@/utils/server-actions/cart";
import DisplayedQuantity from "./DisplayedQuantity";

export default function CartQuantityForm({
  cartQuantity,
  quantityInStock,
  productId,
  smallScreen,
}) {
  return (
    <form
      className=" flex appearance-none flex-col items-center justify-center gap-4 md:flex-row md:gap-2"
      action={cartQuantityHandler}
    >
      <input name="productId" type="hidden" value={productId.toString()} />
      <CartQuantityButton
        {...{ cartQuantity, quantityInStock, smallScreen }}
        value={smallScreen ? "increase" : "decrease"}
      />

      <DisplayedQuantity cartQuantity={cartQuantity} />

      <CartQuantityButton
        {...{ cartQuantity, quantityInStock, smallScreen }}
        value={smallScreen ? "decrease" : "increase"}
      />
    </form>
  );
}
