import LoadingSpinner from "./LoadingSpinner";
import SingleProduct from "./SingleProduct";
import MoreProducts from "./MoreProducts";
import getInitialProductsWrapper from "@/utils/getInitialProducts";

export const productsPerPage = 48;

export default async function ProductList({ category, sort, pricelimit }) {
  const getInitialProducts = getInitialProductsWrapper(
    category,
    sort,
    pricelimit,
  );

  const [{ products, maxPrice, totalCount }] = await getInitialProducts();

  return (
    <>
      <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
        {products.map((product) => (
          <SingleProduct key={product._id} {...product} />
        ))}
      </div>
      <MoreProducts
        maxPrice={maxPrice}
        totalCount={totalCount}
        productsPerPage={productsPerPage}
      />
    </>
  );
}
