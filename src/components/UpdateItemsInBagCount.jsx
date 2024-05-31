"use client";

import { SET_BAG_COUNT } from "@/contexts/actions";
import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// this component only update count of items in wishlist and cart to be shown on nav
export default function BagItemsCount({
  wishlistCount = 0,
  cartCount = 0,
  orderStatus,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    if (orderStatus) return router.replace(pathname);
    dispatch({ type: SET_BAG_COUNT, payload: { wishlistCount, cartCount } });
  }, [cartCount, wishlistCount]);

  return <></>;
}
