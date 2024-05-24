import { cartQuantityHandler } from "../server-actions/cart";

// cart quantity form handler
export default async function countFormAction({
  formData,
  productId,
  cartQuantity,
  quantityInStock,
  setLocalCartQuantity,
}) {
  const action = formData.get("action");

  // update local quantity if item has not been added to cart
  if (!cartQuantity) {
    action === "increase"
      ? setLocalCartQuantity((prev) =>
          prev < quantityInStock ? prev + 1 : quantityInStock,
        )
      : setLocalCartQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
  } else {
    // update quantity in db if item is in cart
    cartQuantityHandler(action, productId);
  }
}
