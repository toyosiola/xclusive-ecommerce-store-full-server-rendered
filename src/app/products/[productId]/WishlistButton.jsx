import { HeartIcon } from "@/assets/icons";
import { useFormStatus } from "react-dom";

export default function WishlistButton({ isInWishlist }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`h-11 rounded border border-black/50 fill-white px-2 text-3xl text-black/70 duration-300 hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-50 ${pending ? "disabled:cursor-wait" : ""}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      disabled={pending}
      type="submit"
    >
      <HeartIcon className={isInWishlist ? "fill-black" : ""} />
    </button>
  );
}
