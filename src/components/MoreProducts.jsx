"use client";

import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "next/navigation";

export default function MoreProducts({
  maxPrice,
  totalCount,
  productsPerPage,
}) {
  const { setInitialDetails } = useGlobalContext();
  const searchParams = useSearchParams();
  const [moreProducts, setMoreProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { inView, ref: observerRef } = useInView();
  const numOfPages = Math.ceil(totalCount / productsPerPage);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  // set maxPrice and totalCount on first product page load
  useEffect(() => {
    setInitialDetails({ maxPrice, totalCount });
  }, []);

  // fetch products when observer is in view
  useEffect(() => {
    async function fetchProducts() {
      const url = `/products/api?page=${page}${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}&` : ""}`;

      try {
        setLoading(true);
        const resp = await fetch(url);
        const newProducts = await resp.json();
        setMoreProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        // show error toast if error
      } finally {
        setLoading(false);
      }
    }

    if (inView && page <= numOfPages) {
      fetchProducts();
    }
  }, [inView, numOfPages, page, category, sort]);

  return (
    <>
      <div className="grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
        {moreProducts.map((product) => (
          <SingleProduct key={product._id} {...product} />
        ))}
      </div>
      {/* observe if user has scroll to the end of displayed products */}
      <div ref={observerRef}></div>
      {/* show loading when fetching products */}
      {loading && (
        <div className="mt-14 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
