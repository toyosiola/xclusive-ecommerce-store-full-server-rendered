"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { useEffect } from "react";
import SingleProduct from "./SingleProduct";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { SET_INITIAL_DETAILS } from "@/contexts/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

export default function MoreProducts({
  maxPrice,
  totalCount,
  userWishlist,
  productsPerPage,
}) {
  const { dispatch } = useGlobalContext();
  const searchParams = useSearchParams();
  const { inView, ref: observerRef } = useInView();
  const numOfPages = Math.ceil(totalCount / productsPerPage);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  async function fetchProducts({ pageParam }) {
    const url = `/products/api/more-products?page=${pageParam}${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}&` : ""}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Error fetching products");
    }
    return await resp.json();
  }

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["more-products", category ? category : "", sort ? sort : ""],
      queryFn: fetchProducts,
      initialPageParam: 2,
      getNextPageParam: (_, __, lastPageParam) =>
        lastPageParam >= numOfPages ? null : lastPageParam + 1,
    });

  // set maxPrice and totalCount on first product page load
  useEffect(() => {
    dispatch({ type: SET_INITIAL_DETAILS, payload: { maxPrice, totalCount } });
  }, []);

  // fetch products when observer is in view
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {data && (
        <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
          {data.pages?.map((group) => (
            <React.Fragment key={crypto.randomUUID()}>
              {group.map((product) => (
                <SingleProduct
                  key={product._id}
                  {...product}
                  userWishlist={userWishlist}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* if error occurred fetching products */}
      {error && (
        <div className="mb-4 text-center">
          <p className="mb-2">Error getting more products</p>
          <button onClick={fetchNextPage} className="btn2 mx-auto">
            Try again
          </button>
        </div>
      )}
      {/* show loading when fetching products */}
      {(status === "pending" || isFetchingNextPage) && (
        <div className="mb-14 mt-14 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {/* observe if user has scroll to the end of displayed products */}
      <div ref={observerRef}></div>
    </>
  );
}
