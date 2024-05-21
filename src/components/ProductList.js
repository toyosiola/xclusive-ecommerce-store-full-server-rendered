import SingleProduct from "./SingleProduct";
import MoreProducts from "./MoreProducts";
import getInitialProductsWrapper from "@/utils/getInitialProducts";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { getUserWishlist } from "@/utils/getWishlist";

export const productsPerPage = 48;

export default async function ProductList({ category, sort, priceLimit }) {
  await connectDB();
  const verifiedSession = await verifySession();
  // get user wishlist
  let userWishlist;
  if (verifiedSession?.isAuth) {
    userWishlist = await getUserWishlist(verifiedSession.userId)();
    userWishlist = userWishlist.map((item) => item.product.toString());
  }

  const [{ products, maxPrice, totalCount }] = await getInitialProductsWrapper(
    category,
    sort,
    priceLimit,
  )(); // wrapper for passing cache keys. returns getInitialProducts func

  return (
    <>
      <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
        {products.map((product) => (
          <SingleProduct
            key={product._id}
            {...product}
            userWishlist={userWishlist}
          />
        ))}
      </div>
      <MoreProducts
        maxPrice={maxPrice}
        totalCount={totalCount}
        userWishlist={userWishlist}
        productsPerPage={productsPerPage}
      />
    </>
  );
}
