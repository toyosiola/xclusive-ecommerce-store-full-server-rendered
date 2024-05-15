import { useRouter } from "next/navigation";

export default function Modal({ showModal }) {
  const router = useRouter();
  return (
    <section
      className={`fixed inset-0 grid place-items-center bg-black/30 p-4 duration-200 ${showModal ? "scale-100" : "scale-0"}`}
    >
      <div className="max-w-screen-sm rounded-xl bg-white px-8 py-14">
        <h3 className="mb-3 text-center text-button1">Success</h3>
        <p className="mb-4">
          {/* Account created successfully. Please check your email to verify
          account */}
          Your account has been created successfully! You can now proceed to
          login
        </p>
        <button
          className="btn2 mx-auto font-bold "
          onClick={() => router.refresh()}
        >
          Login
        </button>
      </div>
    </section>
  );
}
