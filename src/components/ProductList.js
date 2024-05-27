import SingleProduct from "./SingleProduct";
import MoreProducts from "./MoreProducts";
import getInitialProducts from "@/utils/getInitialProducts";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { getUserWishlist } from "@/utils/getWishlist";
import { getSessionCart, getUserCart } from "@/utils/getCart";

export const productsPerPage = 48;

export default async function ProductList({ category, sort, priceLimit }) {
  await connectDB();
  const verifiedSession = await verifySession();
  // get user wishlist
  let userWishlist,
    cart = {};

  // verifiedSession.isAuth is false if not-logged-in session exists
  if (verifiedSession && !verifiedSession?.isAuth) {
    // get session cart
    const sessionCart = await getSessionCart(verifiedSession.sessionId);
    // fill cart object with id and cartQuantity to avoid iterating in each singleProduct
    sessionCart?.forEach(
      ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
    );
  }

  if (verifiedSession?.isAuth) {
    userWishlist = getUserWishlist(verifiedSession.userId);
    let userCart = getUserCart(verifiedSession.userId);
    [userWishlist, userCart] = await new Promise.all([userWishlist, userCart]);
    // fill cart object
    userCart.forEach(
      ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
    );
    // turn wishlist to an array of strings
    userWishlist = userWishlist.map((item) => item.product.toString());
  }

  const [{ products, maxPrice, totalCount }] = await getInitialProducts(
    category,
    sort,
    priceLimit,
  );

  return (
    <>
      <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3">
        {products.map((product) => (
          <SingleProduct
            key={product._id}
            {...{ ...product, userWishlist, cart }}
          />
        ))}
      </div>
      <MoreProducts
        {...{ maxPrice, totalCount, userWishlist, productsPerPage, cart }}
      />
    </>
  );
}
