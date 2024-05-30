import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import ActionButtons from "./ActionButtons";
import RatingStars from "@/components/RatingStars";
import Product from "@/models/ProductModel";
import formatPrice from "@/utils/formatPrice";
import { connectDB } from "@/utils/db";
import { notFound } from "next/navigation";
import { getUserWishlist } from "@/utils/getWishlist";
import verifySession from "@/utils/verifySession";
import { getSessionCart, getUserCart } from "@/utils/getCart";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";

export default async function SingleProductPage({ params: { productId } }) {
  let product, wishlist, isInWishlist, cart;
  await connectDB();

  // verifiedSession is null if no session exists
  const verifiedSession = await verifySession();

  // verifiedSession.isAuth is false if not-logged-in session exists
  if (verifiedSession && !verifiedSession?.isAuth) {
    cart = await getSessionCart(verifiedSession.sessionId);
  }

  // verifiedSession.isAuth is true if user is logged-in
  if (verifiedSession?.isAuth) {
    wishlist = await getUserWishlist(verifiedSession.userId);
    cart = await getUserCart(verifiedSession.userId);
    isInWishlist = !!wishlist.find(
      (item) => item.product.toString() === productId,
    );
  }

  const cartQuantity = cart?.find(
    (item) => item.product.toString() === productId,
  )?.cartQuantity;

  // fetch product
  try {
    product = await Product.findOne({ _id: productId }).select(
      "name price averageRating reviewsCount images description discount quantityInStock",
    );
    if (!product) {
      notFound();
    }
  } catch (error) {
    if (error.name === "CastError") {
      notFound();
    }
    throw new Error("An error occurred! Try again");
  }

  const {
    _id: id,
    name,
    price,
    averageRating,
    reviewsCount,
    images,
    description,
    discount,
    quantityInStock,
  } = product;

  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="Product" product={name} />

        {/* Product container */}
        <div className="grid-cols-2 gap-4 space-y-8 md:grid md:space-y-0 lg:gap-16">
          {/* Product image container */}
          <div className="">
            <Image
              src={images[0]}
              width={640}
              height={640}
              alt={name}
              priority
              className="h-auto w-auto object-cover"
            />
          </div>

          {/* Product details */}
          <div className="">
            <h3 className="mb-4 capitalize">{name}</h3>

            <div className="mb-4 grid grid-cols-[auto_1fr] items-center gap-2 text-base xs:grid-cols-[auto_auto_auto] xs:justify-start xs:text-lg">
              {/* rating */}
              {/* stars container */}
              <RatingStars averageRating={averageRating} />
              {/* ratings count */}
              <p className="text-black/50">{`(${reviewsCount} Reviews)`}</p>
              {/* in / out of stock */}
              <p className="">
                <span>|</span>
                <span
                  className={
                    quantityInStock > 1
                      ? "text-button1"
                      : "font-semibold text-button2"
                  }
                >
                  {quantityInStock > 1 ? " In stock" : " Out of stock"}
                </span>
              </p>
            </div>

            <p className="mb-6 flex flex-wrap gap-4 text-2xl">
              {formatPrice(price, discount)}
              {discount && (
                <span className=" text-black/50 line-through decoration-black/50">
                  {formatPrice(price)}
                </span>
              )}
            </p>
            {/* product description */}
            <p className="mb-10">{description}</p>
            <hr className="mb-10 w-full border border-black/50" />

            {/* buttons container */}
            <ActionButtons
              id={id.toString()}
              {...{ isInWishlist, quantityInStock, cartQuantity }}
            />

            {/* update count of items in wishlist and cart */}
            <UpdateItemsInBagCount
              cartCount={cart?.length}
              wishlistCount={wishlist?.length}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
