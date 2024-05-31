import Product from "@/models/ProductModel";
import { connectDB } from "@/utils/db";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");

  // check if search is an empty string
  if (!search.trim())
    return new Response("Please provide input", { status: 400 });

  await connectDB();
  try {
    const products = await Product.aggregate([
      {
        $search: {
          index: "product-search-static",
          text: {
            query: search,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
      {
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
      },
    ]);

    return Response.json(products);
  } catch (error) {
    console.log(error);
    return new Response("Error getting products", { status: 500 });
  }
}
