import { IconTrashOutline } from "@/assets/icons";
import { useFormStatus } from "react-dom";

export default function AddToCartButton({ cartQuantity }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn2 flex h-11 items-center px-4 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 lg:px-12"
      title={cartQuantity ? "Remove from cart" : "Add to cart"}
      type="submit"
      disabled={pending}
    >
      {!pending ? (
        cartQuantity ? (
          <IconTrashOutline className="text-2xl" />
        ) : (
          "Add to cart"
        )
      ) : (
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-white border-b-transparent duration-1000"></div>
      )}
    </button>
  );
}
