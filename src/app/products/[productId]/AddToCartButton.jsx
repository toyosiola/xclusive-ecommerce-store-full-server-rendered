import { IconTrashOutline } from "@/assets/icons";
import { useFormStatus } from "react-dom";

export default function AddToCartButton({ cartQuantity }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn2 flex h-11 items-center disabled:cursor-not-allowed disabled:opacity-50"
      title={cartQuantity ? "Remove from cart" : "Add to cart"}
      disabled={pending}
    >
      {cartQuantity ? <IconTrashOutline className="text-2xl" /> : "Add to cart"}
    </button>
  );
}
