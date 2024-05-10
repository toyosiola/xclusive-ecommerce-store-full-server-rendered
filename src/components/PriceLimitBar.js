"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import formatPrice from "@/utils/formatPrice";
import { useDebounce } from "@/utils/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PriceLimitBar() {
  const { maxPrice, setPriceLimit } = useGlobalContext();
  const searchParams = useSearchParams();
  const priceLimit =
    searchParams.get("pricelimit") && Number(searchParams.get("pricelimit"));
  const [currentValue, setCurrentValue] = useState(priceLimit || maxPrice);
  const pathname = usePathname();
  const router = useRouter();
  const debounce = useDebounce();

  // update displayed current price limit to maxPrice if maxPrice changes
  useEffect(() => {
    if (!priceLimit) {
      setCurrentValue(maxPrice);
    }
  }, [maxPrice, priceLimit]);

  function updateSearchParams(e) {
    const newPriceLimit = e.target.value;
    setPriceLimit(newPriceLimit);
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sort");
    const url = `${pathname}?${category ? `category=${category}&` : ""}pricelimit=${newPriceLimit}${sortBy ? `&sort=${sortBy}` : ""}`;
    router.replace(url);
  }

  return (
    <div className="mb-6 max-w-max md:mb-10">
      <label
        htmlFor="price_range"
        className="block text-sm font-medium md:text-base"
      >
        Price limit: <br /> {formatPrice(currentValue)}
      </label>
      <input
        type="range"
        min={0}
        max={maxPrice}
        id="price_range"
        name="price_range"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onMouseUp={(e) => debounce(updateSearchParams, e, 300)}
        className="disabled:cursor-not-allowed disabled:opacity-60"
      />
      <div className="flex justify-between">
        <p className="text-sm">$0</p>
        <p className="text-sm">{formatPrice(maxPrice)}</p>
      </div>
    </div>
  );
}
