import { HeartIcon, TrashIcon } from "@/assets/icons";
import { useFormStatus } from "react-dom";

export default function WishlistTrashSubmitButton({
  isWishlistPage,
  isInWishlist,
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`cursor-default rounded-full bg-white p-1 text-2xl duration-300 disabled:opacity-40 ${pending ? "disabled:cursor-wait" : ""}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlistPage ? (
        <TrashIcon />
      ) : (
        <HeartIcon className={isInWishlist ? "fill-black" : "fill-none"} />
      )}
    </button>
  );
}
