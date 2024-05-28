import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../server-actions/cart";

export default async function cartFormAction(
  cartQuantity,
  id,
  localCartQuantity,
) {
  try {
    if (!cartQuantity) {
      const resp = await addToCart(id, localCartQuantity);
      if (resp.success) return toast.success(resp.message, { autoClose: 1500 });
      return toast.error(resp.message);
    }

    // remove from cart
    const resp = await removeFromCart(id);
    if (resp.success) return toast.info(resp.message, { autoClose: 1500 });
    toast.error(resp.message);
  } catch (error) {
    toast.error("Failed! Please check your internet connection");
  }
}
