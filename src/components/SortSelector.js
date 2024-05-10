"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SortSelector() {
  const { totalCount } = useGlobalContext();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort");
  const [currentValue, setCurrentValue] = useState(sortBy || "none");
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(e) {
    setCurrentValue(e.target.value);
    const category = searchParams.get("category");
    const priceLimit = searchParams.get("pricelimit");
    const url = `${pathname}?${category ? `category=${category}` : ""}${priceLimit ? `&pricelimit=${priceLimit}` : ""}&sort=${e.target.value}`;
    router.replace(url);
  }

  return (
    <div className="mb-6 items-center gap-1 sm:flex">
      <p className="mb-3 sm:mb-0">
        <span className="font-semibold">{totalCount} </span>
        items found
      </p>
      <hr className="hidden grow border sm:block" />

      <label htmlFor="sort_by" className="inline-flex gap-1 font-bold">
        Sort by
        <select
          name="sort_by"
          value={currentValue}
          onChange={handleChange}
          className="rounded border border-black/30 font-normal"
        >
          <option value="none">none</option>
          <option value="price ascending">price - lowest</option>
          <option value="price descending">price - highest</option>
          <option value="name ascending">name (a - z)</option>
          <option value="name descending">name (z - a)</option>
        </select>
      </label>
    </div>
  );
}
