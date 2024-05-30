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
          if (search.trim()) setSearchQuery(search);
        }}
        className="mx-auto mb-10 flex max-w-screen-sm items-center justify-center gap-4 rounded-full bg-secondary"
      >
        <input
          type="search"
          name="search"
          className="max-w-full grow rounded-l-full bg-transparent py-1 pl-2 outline-none sm:py-2 sm:pl-4"
          placeholder="What are you looking for?"
        />
        <button
          type="submit"
          className="rounded-r-full bg-button2 px-2 py-1 text-2xl text-white sm:px-4 sm:py-2 sm:text-3xl"
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
          <p className="mb-2">An error occurred</p>
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
