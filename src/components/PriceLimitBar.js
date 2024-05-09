"use client";

import formatPrice from "@/utils/formatPrice";
import { useDebounce } from "@/utils/hooks";

export function PriceLimitBar() {
  const debounce = useDebounce();

  return (
    <div className="mb-6 max-w-max md:mb-10">
      <label
        htmlFor="price_range"
        className="block text-sm font-semibold md:text-base"
      >
        Price:
        {formatPrice(0)}
      </label>
      <input
        type="range"
        id="price_range"
        name="price_range"
        className="disabled:cursor-not-allowed disabled:opacity-60"
      />
      <div className="flex justify-between">
        <p className="text-sm">$0</p>
        <p className="text-sm">{formatPrice(0)}</p>
      </div>
    </div>
  );
}
