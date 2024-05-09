import Product from "@/models/ProductModel";
import SingleProduct from "./SingleProduct";

const subPipeline = (query) => {
  return [
    { $match: query },
    { $sample: { size: 4 } },
    {
      $project: {
        name: 1,
        images: 1,
        averageRating: 1,
        reviewsCount: 1,
        price: 1,
        newProduct: 1,
        discount: 1,
      },
    },
  ];
};

const featuredProducts = (async function () {
  return Product.aggregate([
    {
      $facet: {
        flashSales: subPipeline({ discount: { $gt: 0 } }),
        bestSelling: subPipeline({ reviewsCount: { $gt: 50 } }),
        topProducts: subPipeline({ price: { $gt: 70000 } }),
      },
    },
  ]);
})();

export async function FlashSalesProductsSamples() {
  const [{ flashSales }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {flashSales.map((product) => (
        <SingleProduct key={product._id} {...product} />
      ))}
    </div>
  );
}

export async function BestSellingProductsSamples() {
  const [{ bestSelling }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {bestSelling.map((product) => (
        <SingleProduct key={product._id} {...product} />
      ))}
    </div>
  );
}

export async function TopProductsSamples() {
  const [{ topProducts }] = await featuredProducts;

  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {topProducts.map((product) => (
        <SingleProduct key={product._id} {...product} />
      ))}
    </div>
  );
}
