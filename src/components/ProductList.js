import LoadingSpinner from "./LoadingSpinner";
import SingleProduct from "./SingleProduct";
import MoreProducts from "./MoreProducts";
import getInitialProductsWrapper from "@/utils/getInitialProducts";

export default async function ProductList({ category }) {
  const getInitialProducts = getInitialProductsWrapper(category);
  const [{ products, maxPrice, totalCount }] = await getInitialProducts();
  // if (loading && !scrollFetching) {
  //   return (
  //     <div className="grid h-[calc(100vh-18rem)] place-items-center rounded-lg bg-gray-50">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
        {products.map((product) => (
          <SingleProduct key={product._id} {...product} />
        ))}
      </div>
      <MoreProducts maxPrice={maxPrice} totalCount={totalCount} />
    </>
  );
}
