import { connectDB } from "@/utils/db";
import verifySession from "@/utils/verifySession";
import { getUserWishlist } from "@/utils/getWishlist";
import { getUserCart } from "@/utils/getCart";
import SingleProduct from "@/components/SingleProduct";
import Link from "next/link";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";

export default async function Wishlist() {
  await connectDB();
  // verifiedSession is null if no session exists
  const verifiedSession = await verifySession("inPage");

  // if user is not logged in
  if (!verifiedSession?.isAuth) {
    return (
      <main className="mb-36 mt-20">
        <div className="global-container">
          <h3 className="mb-5 text-center">Login to access your wishlist</h3>
          <Link href="/login" className="btn2 mx-auto">
            Login
          </Link>
        </div>
      </main>
    );
  }

  let cart = {};
  const promise1 = getUserWishlist(verifiedSession.userId, true);
  const promise2 = getUserCart(verifiedSession.userId);
  const [wishlist, userCart] = await Promise.all([promise1, promise2]);
  userCart.forEach(
    ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
  );

  return (
    <main className="mb-36 mt-20">
      <div className="global-container">
        <div className="mb-20 flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg">
            Wishlist:{" "}
            <strong className="tracking-wider">
              {wishlist.length} item{wishlist.length > 1 ? "s" : ""}
            </strong>
          </p>
          {/* <button className="rounded border border-black/50 px-6 py-2 duration-200 hover:border-yellow-200 hover:bg-yellow-200 disabled:cursor-not-allowed disabled:border-black/50 disabled:bg-transparent disabled:opacity-50 sm:px-12 sm:py-4">
            Add All To Cart
          </button> */}
        </div>
        {/* Wishlist products container */}
        {wishlist.length > 0 ? (
          <div className="mb-14 grid-cols-2 place-items-center gap-4 gap-y-14 space-y-10 sm:grid sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map(({ product }) => (
              <SingleProduct
                key={product._id}
                {...{ ...product, cart, isWishlistPage: true }}
              />
            ))}
          </div>
        ) : (
          <div className="">
            <h3 className="mb-5 text-center">Empty wishlist</h3>
            <Link href="/products" className="btn2 mx-auto">
              Add products
            </Link>
          </div>
        )}
      </div>

      {/* update count of items in wishlist and cart */}
      <UpdateItemsInBagCount
        cartCount={Object.keys(cart).length}
        wishlistCount={wishlist.length}
      />
    </main>
  );
}
