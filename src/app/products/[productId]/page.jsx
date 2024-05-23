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

export default async function SingleProductPage({ params: { productId } }) {
  let product, isInWishlist, isInCart;
  await connectDB();

  // verifiedSession is null if no session exists
  const verifiedSession = await verifySession();

  // verifiedSession.isAuth is false if not-logged-in session exists
  if (verifiedSession && !verifiedSession?.isAuth) {
    const sessionCart = await getSessionCart(verifiedSession.sessionId);
    isInCart = sessionCart.find(
      (item) => item.product.toString() === productId,
    );
  }

  // verifiedSession.isAuth is true if user is logged-in
  if (verifiedSession?.isAuth) {
    const userWishlist = await getUserWishlist(verifiedSession.userId);
    const userCart = await getUserCart(verifiedSession.userId);
    isInWishlist = !!userWishlist.find(
      (item) => item.product.toString() === productId,
    );
    isInCart = userCart.find((item) => item.product.toString() === productId);
  }

  // fetch product
  try {
    product = await Product.findOne({ _id: productId }).select(
      "name price averageRating reviewsCount images description discount",
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

            <div className="mb-4 flex items-center gap-2 text-lg">
              {/* rating */}
              {/* stars container */}
              <RatingStars averageRating={averageRating} />
              {/* count */}
              <p className="text-lg text-black/50">{`(${reviewsCount} Reviews)`}</p>
              <span>|</span> <span className="text-button1">In stock</span>
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
              isInWishlist={isInWishlist}
              cartQuantity={isInCart?.cartQuantity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
