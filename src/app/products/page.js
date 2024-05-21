import BreadCrumb from "@/components/BreadCrumb";
import SearchInput from "@/components/SearchInput";
import MainCategory from "@/components/MainCategory";
import { PriceLimitBar } from "@/components/PriceLimitBar";
import { mainCategories } from "@/data/categories";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import ProductSkeleton from "@/components/ProductSkeleton";
import SortSelector from "@/components/SortSelector";

export default function Products({
  searchParams: { category, sort, pricelimit: priceLimit },
}) {
  return (
    <main className="mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="Products" />
        <div className="grid-cols-[auto_1fr] gap-4 md:grid lg:gap-10">
          {/* filtering categories */}
          <div className="">
            {/* Search box */}
            <div className="mb-4 flex items-center gap-2 rounded bg-secondary px-3 text-xs sm:mb-5 sm:text-sm lg:hidden">
              <SearchInput />
            </div>

            {/* categories */}
            <div className="mb-6 max-w-full overflow-hidden text-sm">
              <h4 className="mb-1 font-semibold md:mb-3">Categories</h4>
              <ul className="flex justify-between gap-2 overflow-x-auto md:block md:space-y-4">
                {mainCategories.map((mainCat) => (
                  <MainCategory
                    key={mainCat.id}
                    {...mainCat}
                    activeCategory={category}
                  />
                ))}
              </ul>
            </div>

            {/* price filter */}
            {/* <PriceLimitBar /> */}
          </div>

          {/* Products container */}
          <div className="">
            <SortSelector />

            {/* all products */}
            <Suspense fallback={<ProductSkeleton count={48} isProductsPage />}>
              <ProductList
                category={category}
                sort={sort}
                priceLimit={priceLimit}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
