import { IconCheckmarkCircle } from "@/assets/icons";
import Link from "next/link";

export default function page() {
  return (
    <main className="">
      <div className="global-container grid place-items-center py-10">
        <div className="product-shadow rounded-lg bg-white px-6 py-10 sm:px-14 sm:py-20">
          <IconCheckmarkCircle className="mx-auto -mt-4 text-[10rem] text-button1 sm:text-[14rem]" />
          <p className="mb-8 text-center sm:mb-12">
            Your order has been placed successfully
          </p>
          <div className="grid items-center gap-4 sm:grid-cols-2 sm:gap-10">
            <Link
              href="/products"
              className="rounded bg-secondary2 py-4 text-center text-text duration-300 hover:bg-hoverButton sm:px-8 md:px-12"
            >
              Continue shopping
            </Link>
            <Link href="/" className="btn2 w-full max-w-none text-center">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
