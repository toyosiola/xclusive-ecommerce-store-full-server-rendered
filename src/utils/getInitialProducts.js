import Product from "@/models/ProductModel";
import { unstable_cache } from "next/cache";

export const productsPerPage = 48;

// use wrapper for unstable cache to pass params to cache key
export default function getInitialProductsWrapper(category) {
  return unstable_cache(
    async () => {
      // construct filter query from depending on searchParams value
      const filterQuery = {};
      if (category) {
        switch (category) {
          case "women fashion": {
            filterQuery.category = "women fashion";
            break;
          }
          case "men fashion": {
            filterQuery.category = "men fashion";
            break;
          }
          case "electronics": {
            filterQuery.category = "electronics";
            break;
          }
          case "shoes": {
            filterQuery.tags = "shoes";
            break;
          }
          case "phones": {
            filterQuery.tags = "phone";
            break;
          }
          case "laptops": {
            filterQuery.tags = "laptop";
            break;
          }
          case "watches": {
            filterQuery.tags = "watch";
            break;
          }
          case "camera": {
            filterQuery.tags = "camera";
            break;
          }
          case "headphones": {
            filterQuery.tags = { $in: ["headphones", "earphones"] };
            break;
          }
          case "flash sales": {
            filterQuery.discount = { $gt: 0 };
            break;
          }
          case "best selling": {
            filterQuery.reviewsCount = { $gt: 50 };
            break;
          }
        }
      }

      // find products, total number of products, maxPrice and limit returned products
      return await Product.aggregate([
        {
          $match: filterQuery,
        },
        {
          $group: {
            _id: null, // Group all documents together
            totalCount: { $count: {} }, // Count the total number of documents
            maxPrice: { $max: "$price" }, // Calculate the maximum price
            products: {
              $push: {
                _id: "$_id",
                name: "$name",
                images: "$images",
                averageRating: "$averageRating",
                reviewsCount: "$reviewsCount",
                price: "$price",
                newProduct: "$newProduct",
                discount: "$discount",
              },
            }, // Push projected fields into an array
          },
        },
        {
          $project: {
            _id: 0, // Exclude the _id field from the output
            totalCount: 1,
            maxPrice: 1,
            products: { $slice: ["$products", productsPerPage] }, // Limit the array items to number of products per page
          },
        },
      ]);
    },
    ["initial-products", category ? category : "all"],
    { tags: ["fetch-products"] },
  );
}
