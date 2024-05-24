import { useFormStatus } from "react-dom";

export default function QuantityButton({ value }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="action"
      value={value}
      disabled={pending}
      className={`flex h-11 w-10 items-center justify-center border text-2xl duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${value === "decrease" ? "rounded-l border-black/50 hover:border-button2 hover:bg-button2 hover:text-text" : "rounded-r border-button2 bg-button2 text-text hover:border-black/50 hover:bg-transparent hover:text-inherit"}`}
    >
      {value === "decrease" ? "-" : "+"}
    </button>
  );
}
