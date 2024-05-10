"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { useEffect } from "react";

export default function MoreProducts({ maxPrice, totalCount }) {
  const { setInitialDetails } = useGlobalContext();

  // set maxPrice and totalCount on first product page load
  useEffect(() => {
    setInitialDetails({ maxPrice, totalCount });
  }, []);

  return <div>MoreProducts</div>;
}
