import { useFormStatus } from "react-dom";

export default function QuantityButton({
  value,
  displayedQuantity,
  quantityInStock,
}) {
  const { pending } = useFormStatus();
  const decreaseBtn = value === "decrease";

  return (
    <button
      type="submit"
      name="action"
      value={value}
      disabled={
        pending ||
        (decreaseBtn
          ? displayedQuantity <= 1 // disable decrease when quantity is 1
          : displayedQuantity >= quantityInStock) //disable increase when quantity is equal to quantity in stock
      }
      className={`flex h-11 w-10 items-center justify-center border text-2xl duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${pending ? "disabled:cursor-wait" : ""} ${decreaseBtn ? "rounded-l border-black/50 hover:border-button2 hover:bg-button2 hover:text-text" : "rounded-r border-button2 bg-button2 text-text hover:border-black/50 hover:bg-transparent hover:text-inherit"}`}
    >
      {value === "decrease" ? "-" : "+"}
    </button>
  );
}
