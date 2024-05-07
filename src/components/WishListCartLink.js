import { CartIcon, HeartIcon } from "@/assets/icons";
import Link from "next/link";

export default function WishLIstCartLink() {
  return (
    <div className="flex items-center gap-4 text-3xl">
      <Link href="/wishlist" className="relative">
        <p className="absolute right-0 top-0 grid  h-5 w-5 translate-x-1/4 place-items-center rounded-full bg-secondary2 text-xs font-semibold text-white">
          0
        </p>
        <HeartIcon className={`duration-500 hover:text-text1 fill-black`} />
      </Link>
      <Link href="/cart" className="relative">
        <p className="absolute right-0 top-0 grid  h-5 w-5 translate-x-1/2 place-items-center rounded-full bg-secondary2 text-xs font-semibold text-white">
          0
        </p>
        <CartIcon className={`duration-300 hover:text-text1 fill-black`} />
      </Link>
      {/* to do put user icon here */}
    </div>
  );
}
