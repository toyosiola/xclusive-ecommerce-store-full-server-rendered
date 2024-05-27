import "server-only";

import Product from "@/models/ProductModel";
import { unstable_cache } from "next/cache";
import { productsPerPage } from "@/components/ProductList";
import { connectDB, constructFilterQuery, constructSortQuery } from "./db";

// use wrapper for unstable cache to pass params to cache key
export default function getInitialProducts(category, sort, priceLimit) {
  return unstable_cache(
    async () => {
      // construct filter query depending on product category
      const filterQuery = constructFilterQuery({ category, priceLimit });

      // construct sort query
      const sortQuery = constructSortQuery(sort);

      // build aggregation pipeline
      const aggregationPipeline = [
        {
          $match: filterQuery,
        },
      ];

      // add sort stage if sort is true
      if (sort && sort !== "none") {
        aggregationPipeline.push({ $sort: sortQuery });
      }

      // add group stage
      aggregationPipeline.push(
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
                quantityInStock: "$quantityInStock",
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
      );

      await connectDB();
      return await Product.aggregate(aggregationPipeline);
    },
    ["initial-products", category || "all", priceLimit || "", sort || "none"],
    { tags: ["products"] },
  )();
}
