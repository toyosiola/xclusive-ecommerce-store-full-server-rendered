import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "../RatingStars";
import WishlistTrashForm from "./WishlistTrashForm";
import AddToCartForm from "./AddToCartForm";
import CartQuantityForm from "./CartQuantityForm";
import RemoveFromCartForm from "./RemoveFromCartForm";

function SingleProduct({
  _id: id,
  name,
  price,
  averageRating,
  reviewsCount,
  images,
  newProduct,
  discount,
  quantityInStock,
  isWishlistPage,
  userWishlist,
  cart,
}) {
  const isInWishlist = isWishlistPage || userWishlist?.includes(id.toString());
  const cartQuantity = cart[id]; // cartQuantity true means item is in cart

  // reducing the length of product name above a certain level
  let newName;
  if (discount) {
    newName = name.length > 16 ? `${name.slice(0, 16)}...` : name;
  } else {
    newName = name.length > 24 ? `${name.slice(0, 24)}...` : name;
  }

  return (
    <div className="relative mx-auto w-[20rem] max-w-full overflow-x-hidden sm:mx-0">
      {/* icons */}
      <WishlistTrashForm
        isWishlistPage={isWishlistPage}
        isInWishlist={isInWishlist}
        id={id.toString()}
      />

      {/* discount */}
      {discount ? (
        <p className="absolute left-3 top-3 rounded bg-secondary2 px-3 py-1 text-xs text-text">
          {`-${parseInt(discount * 100)}%`}
        </p>
      ) : (
        ""
      )}
      {newProduct && (
        <p
          className={`absolute left-3 rounded bg-button1 px-3 py-1 text-sm font-semibold text-text ${
            discount ? "top-10" : "top-3"
          }`}
        >
          New
        </p>
      )}
      {/* product details container */}
      <Link href={"/products/" + id} className="" prefetch={false}>
        {/* image container */}
        <div className="h-[12.8125rem]">
          <Image
            src={images[0]}
            width={338}
            height={253}
            alt={name}
            sizes="(min-width: 640px) 50vw, (min-width: 768px) 33vw, (min-width: 1024px) 25vw, 100vw"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        {/* product content */}
        <div className="mt-4">
          <div className="mb-1 grid grid-cols-[1fr_auto] items-center justify-between">
            <h4 className="whitespace-nowrap font-semibold text-gray-600">
              {newName}
            </h4>

            {/* price of product */}
            <h4 className="flex items-baseline gap-2 font-bold text-secondary2">
              {formatPrice(price, discount)}
              {discount && (
                <span className="text-sm font-medium text-black/50 line-through decoration-black/50">
                  {formatPrice(price)}
                </span>
              )}
            </h4>
          </div>

          {/* ratings container */}
          <div className="flex items-center gap-2 text-lg">
            <RatingStars averageRating={averageRating} />
            {/* ratings count */}
            <p className="text-base font-bold text-black/50">
              ({reviewsCount})
            </p>
          </div>
        </div>
      </Link>
      <div className="relative">
        {!isWishlistPage && ( // don't render in wishlist page
          <RemoveFromCartForm {...{ cartQuantity, productId: id.toString() }} />
        )}

        {/* add to cart button - disappear when item is in cart */}
        <AddToCartForm
          {...{ cartQuantity, productId: id.toString(), isWishlistPage }}
        />

        {/* increase and decrease buttons container. Disappear when item not in cart */}
        {!isWishlistPage && ( // don't render in wishlist page
          <CartQuantityForm
            {...{ cartQuantity, quantityInStock, productId: id }}
          />
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
