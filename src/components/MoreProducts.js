"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { useEffect } from "react";

export default function MoreProducts({ maxPrice, totalCount }) {
  const { setInitialDetails } = useGlobalContext();
  // set maxPrice and totalCount on first product page load
  useEffect(() => {
    console.log("setting", maxPrice);
    setInitialDetails({ maxPrice, totalCount });
  }, []);

  return <div>MoreProducts</div>;
}
