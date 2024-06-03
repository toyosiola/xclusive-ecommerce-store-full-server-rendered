import BreadCrumb from "@/components/BreadCrumb";
import SearchedProducts from "./SearchedProducts";
import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { getUserWishlist } from "@/utils/getWishlist";
import { getSessionCart, getUserCart } from "@/utils/getCart";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";

export default async function SearchPage({ searchParams: { query } }) {
  await connectDB();
  const verifiedSession = await verifySession("inPage");
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
    [userWishlist, userCart] = await Promise.all([userWishlist, userCart]);
    // fill cart object
    userCart.forEach(
      ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
    );
    // turn wishlist to an array of strings
    userWishlist = userWishlist.map((item) => item.product.toString());
  }

  return (
    <main className="mb-14 mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="Search" />
        {/* search bar container */}

        <SearchedProducts {...{ userWishlist, cart, searchQuery: query }} />

        {/* update count of items in wishlist and cart */}
        <UpdateItemsInBagCount
          cartCount={Object.keys(cart).length}
          wishlistCount={userWishlist?.length}
        />
      </div>
    </main>
  );
}
