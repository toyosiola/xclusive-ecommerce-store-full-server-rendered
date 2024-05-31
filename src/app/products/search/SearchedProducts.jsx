"use client";

import { SearchIcon } from "@/assets/icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import SingleProduct from "@/components/SingleProduct";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchProducts(search) {
  const resp = await fetch(`/products/api/search-products?search=${search}`);
  if (!resp.ok) {
    throw new Error("Error fetching products");
  }
  return await resp.json();
}

export default function SearchedProducts({ userWishlist, cart }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["searched-products", searchQuery],
    queryFn: () => fetchProducts(searchQuery),
    staleTime: 1000 * 60 * 30, // 30mins
    enabled: !!searchQuery,
  });
  return (
    <>
      <form
        action={(formData) => {
          const search = formData.get("search");
          if (search.trim() && !isLoading) setSearchQuery(search);
        }}
        className="mx-auto mb-10 flex max-w-screen-sm items-center justify-center gap-4 rounded-full bg-secondary"
      >
        <input
          type="search"
          name="search"
          className="max-w-full grow rounded-l-full bg-transparent pl-4 outline-none sm:pl-6"
          placeholder="Search products here..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-r-full bg-button2 px-4 py-2 text-3xl text-white duration-300 hover:bg-hoverButton disabled:opacity-80 sm:py-3 sm:text-3xl ${isLoading ? "cursor-wait" : ""}`}
        >
          <SearchIcon className="font-bold" />
        </button>
      </form>

      {isLoading && (
        <div className="my-14 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* if error */}
      {isError && (
        <div className="my-14 text-center">
          <p className="mb-4 font-medium md:text-xl">An error occurred...</p>
          <button onClick={refetch} className="btn2 mx-auto">
            Try again
          </button>
        </div>
      )}

      {/* display searched products  */}
      {data && (
        <div className="grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
          {data.map((product) => (
            <SingleProduct
              key={product._id}
              {...{ ...product, userWishlist, cart }}
            />
          ))}
        </div>
      )}
    </>
  );
}
