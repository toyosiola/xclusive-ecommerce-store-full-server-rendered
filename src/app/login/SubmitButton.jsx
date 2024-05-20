import { useFormStatus } from "react-dom";

export default function SubmitButton({ signUp }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn2 mb-4 mt-10 block w-full max-w-none rounded font-medium text-text duration-300 disabled:cursor-not-allowed disabled:bg-button2/40"
      disabled={pending}
    >
      {signUp ? "Create Account" : "Log In"}
    </button>
  );
}
