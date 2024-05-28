"use client";

import { CartIcon, HeartIcon } from "@/assets/icons";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { usePathname } from "next/navigation";

export default function NavIcons() {
  const { user, cartCount, wishlistCount } = useGlobalContext();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 text-3xl">
      <Link href="/wishlist" className="relative">
        <span className="absolute right-0 top-0 grid h-5 w-5 translate-x-1/4 place-items-center rounded-full bg-secondary2 text-xs font-semibold text-white">
          {pathname !== "/login" && wishlistCount}
        </span>
        <HeartIcon className="fill-black duration-500 hover:text-text1" />
      </Link>
      <Link href="/cart" className="relative">
        <span className="absolute right-0 top-0 grid  h-5 w-5 translate-x-1/2 place-items-center rounded-full bg-secondary2 text-xs font-semibold text-white">
          {pathname !== "/login" && cartCount}
        </span>
        <CartIcon className="fill-black duration-300 hover:text-text1" />
      </Link>

      {/* user menu - show on large screens when user is logged in */}
      {user && <UserMenu />}
    </div>
  );
}
