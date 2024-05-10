import BreadCrumb from "@/components/BreadCrumb";
import SearchInput from "@/components/SearchInput";
import MainCategory from "@/components/MainCategory";
import { PriceLimitBar } from "@/components/PriceLimitBar";
import { mainCategories } from "@/data/categories";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Products({ searchParams: { category } }) {
  return (
    <main className="mb-36 mt-10 sm:mt-20" key={crypto.randomUUID()}>
      <div className="global-container">
        <BreadCrumb page="Products" />
        <div className="grid-cols-[auto_1fr] gap-4 md:grid lg:gap-10">
          {/* filtering categories */}
          <div className="">
            {/* Search box */}
            <div className="mb-4 flex items-center gap-2 rounded bg-secondary px-3 text-xs sm:mb-5 sm:text-sm lg:hidden">
              <SearchInput className="grow bg-transparent px-1 py-3 focus:outline-none md:max-w-[8rem]" />
            </div>

            {/* categories */}
            <div className="mb-6 text-sm">
              <h4 className="mb-1 font-semibold md:mb-3">Categories</h4>
              <ul className="flex justify-between gap-2 overflow-x-auto md:block md:space-y-4">
                {mainCategories.map((category) => (
                  <MainCategory key={category.id} {...category} />
                ))}
              </ul>
            </div>

            {/* other filters */}
            <PriceLimitBar />

            {/* reset button */}
            <button className="btn2 mb-10 px-6 py-2 text-sm lg:text-base">
              Reset filter(s)
            </button>
          </div>

          {/* Products container */}
          <div className="">
            <div className="mb-6 items-center gap-1 sm:flex">
              <p className="mb-3 sm:mb-0">
                <span className="font-semibold">0</span>
                items found
              </p>
              <hr className="hidden grow border sm:block" />

              <label htmlFor="sort_by" className="inline-flex gap-1 font-bold">
                Sort by
                <select
                  name="sort_by"
                  className="rounded border border-black/30 font-normal"
                >
                  <option value="none">none</option>
                  <option value="price_ascending">price - lowest</option>
                  <option value="price_descending">price - highest</option>
                  <option value="name_ascending">name (a - z)</option>
                  <option value="name_descending">name (z - a)</option>
                </select>
              </label>
            </div>

            {/* all products */}
            <Suspense fallback={<ProductSkeleton count={48} isProductsPage />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
