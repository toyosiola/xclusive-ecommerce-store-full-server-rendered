import Product from "@/models/ProductModel";
import SingleProduct from "./SingleProduct";
import { unstable_cache } from "next/cache";

// define projection stage for each aggregation
export const projectStage = {
  $project: {
    name: 1,
    images: 1,
    averageRating: 1,
    reviewsCount: 1,
    price: 1,
    newProduct: 1,
    discount: 1,
    quantityInStock: 1,
  },
};

const subPipeline = (query) => {
  return [{ $match: query }, { $sample: { size: 4 } }, projectStage];
};

// unstable cache must be called in a component or ... to be cached
export const getFeaturedProducts = unstable_cache(
  async function () {
    return await Product.aggregate([
      {
        $facet: {
          flashSales: subPipeline({ discount: { $gt: 0 } }),
          bestSelling: subPipeline({ reviewsCount: { $gt: 50 } }),
          topProducts: subPipeline({ price: { $gt: 70000 } }),
        },
      },
    ]);
  },
  ["featured-products"],
  { revalidate: 86400, tags: ["products", "featured-products"] }, // revalidate - 1day in seconds
);

export async function FlashSalesProductsSamples({
  userWishlist,
  cart,
  featuredProducts,
}) {
  const [{ flashSales }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {flashSales.map((product) => (
        <SingleProduct
          key={product._id}
          {...{ ...product, userWishlist, cart }}
        />
      ))}
    </div>
  );
}

export async function BestSellingProductsSamples({
  userWishlist,
  cart,
  featuredProducts,
}) {
  const [{ bestSelling }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {bestSelling.map((product) => (
        <SingleProduct
          key={product._id}
          {...{ ...product, userWishlist, cart }}
        />
      ))}
    </div>
  );
}

export async function TopProductsSamples({
  userWishlist,
  cart,
  featuredProducts,
}) {
  const [{ topProducts }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {topProducts.map((product) => (
        <SingleProduct
          key={product._id}
          {...{ ...product, userWishlist, cart }}
        />
      ))}
    </div>
  );
}
