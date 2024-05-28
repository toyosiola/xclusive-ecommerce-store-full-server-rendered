import { useFormStatus } from "react-dom";

export default function RemoveFromCartButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="py-1 pr-2 font-medium text-button2 duration-300 hover:text-hoverButton disabled:cursor-not-allowed disabled:opacity-30"
      title="Remove item"
      disabled={pending}
    >
      Remove
    </button>
  );
}
