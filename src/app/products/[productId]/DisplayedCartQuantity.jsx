import { useFormStatus } from "react-dom";

export default function DisplayedCartQuantity({ displayedQuantity }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex h-11 w-14 items-center justify-center border-y border-black/50 text-center text-xl sm:w-20">
      {!pending ? (
        displayedQuantity
      ) : (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/70 border-b-transparent duration-1000"></div>
      )}
    </div>
  );
}
