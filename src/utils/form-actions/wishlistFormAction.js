import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../server-actions/wishlist";

export default async function wishlistFormAction(isInWishlist, productId) {
  try {
    if (!isInWishlist) {
      const resp = await addToWishlist(productId);
      if (resp.success) return toast.success(resp.message, { autoClose: 1500 });
      return toast.error(resp.message);
    }

    // remove from wishlist
    const resp = await removeFromWishlist(productId);
    if (resp.success) return toast.info(resp.message, { autoClose: 1500 });
    toast.error(resp.message);
  } catch (error) {
    toast.error("Failed! Please check your internet connection");
  }
}
