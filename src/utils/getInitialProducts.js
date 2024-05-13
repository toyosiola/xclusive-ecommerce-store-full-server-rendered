import "server-only";

import Product from "@/models/ProductModel";
import { unstable_cache } from "next/cache";
import { productsPerPage } from "@/components/ProductList";

// use wrapper for unstable cache to pass params to cache key
export default function getInitialProductsWrapper(category, sort, pricelimit) {
  return unstable_cache(
    async () => {
      // construct filter query depending on product category
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

      // add price limit to filter query
      if (pricelimit) {
        filterQuery.price = { $lte: Number(pricelimit) };
      }

      // construct sort query
      const sortQuery = {};
      if (sort) {
        switch (sort) {
          case "name ascending": {
            sortQuery.name = 1;
            break;
          }
          case "name descending": {
            sortQuery.name = -1;
            break;
          }
          case "price ascending": {
            sortQuery.price = 1;
            break;
          }
          case "price descending": {
            sortQuery.price = -1;
            break;
          }
        }
      }

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

      return await Product.aggregate(aggregationPipeline);
    },
    [
      "initial-products",
      category ? category : "all",
      pricelimit ? pricelimit : "",
      sort ? sort : "none",
    ],
    { tags: ["products"] },
  );
}
