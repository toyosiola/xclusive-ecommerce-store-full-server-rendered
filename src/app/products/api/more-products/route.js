import { productsPerPage } from "@/components/ProductList";
import Product from "@/models/ProductModel";
import { constructFilterQuery, constructSortQuery } from "@/utils/db";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page"));
  const priceLimit = searchParams.get("pricelimit");

  try {
    const filterQuery = constructFilterQuery({ category, priceLimit });
    let result = Product.find(filterQuery);

    if (sort) {
      const sortQuery = constructSortQuery(sort);
      result.sort(sortQuery);
    }

    result.skip((page - 1) * productsPerPage).limit(productsPerPage);

    const products = await result;
    return Response.json(products);
  } catch (error) {
    return new Response("Error getting products", { status: 500 });
  }
}
