import CartItem from "./CartItem";
import formatPrice from "@/utils/formatPrice";
import { getSessionCart, getUserCart } from "@/utils/getCart";
import verifySession from "@/utils/verifySession";
import Link from "next/link";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";
import { getUserWishlist } from "@/utils/getWishlist";

export default async function Cart() {
  const verifiedSession = await verifySession("inPage");
  let cart = [],
    wishlist = [];

  // verifiedSession.isAuth is false if not-logged-in session exists
  if (verifiedSession && !verifiedSession?.isAuth) {
    // get session cart
    const sessionCart = await getSessionCart(verifiedSession.sessionId, true);
    cart = sessionCart?.map((item) => ({
      ...item.product,
      cartQuantity: item.cartQuantity,
    }));
  }

  // verifiedSession.isAuth is true if user is logged-in
  if (verifiedSession?.isAuth) {
    const promise1 = getUserWishlist(verifiedSession.userId, true);
    const promise2 = getUserCart(verifiedSession.userId, true);
    const [userWishlist, userCart] = await Promise.all([promise1, promise2]);
    wishlist = userWishlist;
    cart = userCart.map((item) => ({
      ...item.product,
      cartQuantity: item.cartQuantity,
    }));
  }

  const subTotal = cart.reduce((lastTotal, current) => {
    const { price, cartQuantity, discount } = current;
    const actualPrice = price - (price * discount || 0);
    let subTotal = actualPrice * cartQuantity;

    return lastTotal + subTotal;
  }, 0);

  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container">
        <p className="mb-10 flex items-center gap-3 text-sm text-black/50 sm:mb-20">
          Home <span>/</span> <span className="text-black">Cart</span>
        </p>

        {/* heading on large screens */}
        {cart.length > 0 ? (
          <div className="space-y-10">
            <div className="product-shadow hidden grid-cols-4 place-items-center rounded py-6 font-semibold md:grid">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>

            {cart.map((product) => (
              <CartItem
                key={product._id}
                {...{ ...product, id: product._id.toString() }}
              />
            ))}
          </div>
        ) : (
          <h3 className="mb-5 text-center">No item in cart</h3>
        )}
        {/* Return to shop link */}
        <Link
          href="/products"
          className={`mt-4 block max-w-max rounded border px-12 py-4 duration-300 hover:border-black hover:bg-black hover:text-text ${cart.length < 1 ? "mx-auto" : ""}`}
        >
          Return to shop
        </Link>

        {cart.length > 0 && (
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-start md:gap-2">
            {/* Coupon container */}
            <div className="flex flex-wrap justify-between gap-4 md:justify-self-start ">
              <input
                type="text"
                className="w-full rounded border px-6 py-4 text-black/50 focus:outline-none sm:w-auto"
                placeholder="Coupon Code"
              />
              <button type="button" className="btn2 mx-auto block sm:mx-0">
                Apply Coupon
              </button>
            </div>

            {/* Total amount container */}
            <div className="w-full space-y-4 rounded border px-6 py-8 md:justify-self-end">
              <p className="text-lg font-medium">Cart Total</p>
              <div className="flex justify-between border-b pb-4">
                <p className="">Subtotal:</p>
                <p className="">{formatPrice(subTotal)}</p>
              </div>
              <div className="flex justify-between border-b pb-4">
                <p className="">Shipping:</p> <p className="">Free</p>
              </div>
              <div className="flex justify-between border-b pb-4">
                <p className="">Grand Total:</p>{" "}
                <p className="">{formatPrice(subTotal)}</p>
              </div>

              <button className="btn2 w-full max-w-none">
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* update count of items in wishlist and cart */}
      <UpdateItemsInBagCount
        {...{ cartCount: cart.length, wishlistCount: wishlist.length }}
      />
    </main>
  );
}
