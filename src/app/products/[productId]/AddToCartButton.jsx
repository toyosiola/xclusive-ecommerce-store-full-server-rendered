import { useFormStatus } from "react-dom";

export default function AddToCartButton({ cartQuantity }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn2 py-o flex h-11 items-center disabled:cursor-not-allowed disabled:opacity-50"
      title="Add to cart"
      disabled={pending}
    >
      {cartQuantity ? "Remove from cart" : "Add to cart"}
    </button>
  );
}
