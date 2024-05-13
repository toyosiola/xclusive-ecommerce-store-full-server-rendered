import {
  StarEmptyIcon,
  StarFullyFilledIcon,
  StarHalfFilledIcon,
  TrashIcon,
} from "@/assets/icons";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "./RatingStars";

function SingleProduct({
  _id: id,
  name,
  price,
  averageRating,
  reviewsCount,
  images,
  newProduct,
  discount,
  isWishlistPage,
}) {
  // reducing the length of product name above a certain level
  let newName;
  if (discount) {
    newName = name.length > 15 ? `${name.slice(0, 15)}...` : name;
  } else {
    newName = name.length > 25 ? `${name.slice(0, 25)}...` : name;
  }

  return (
    <div className="relative mx-auto w-[20rem] max-w-full overflow-x-hidden sm:mx-0">
      {/* icons */}
      {isWishlistPage ? (
        <div
          className="absolute right-3 top-3 rounded-full bg-white fill-none p-1 text-2xl duration-300"
          title="Remove from wishlist"
        >
          <TrashIcon />
        </div>
      ) : (
        <div className="absolute right-3 top-3 rounded-full bg-white p-1"></div>
      )}

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
          <div className="mb-2 grid grid-cols-[1fr_auto] items-center justify-between gap-1">
            <h4 className="whitespace-nowrap font-semibold text-gray-600">
              {newName}
            </h4>

            {/* price of product */}
            <h4 className="flex items-baseline gap-2 text-lg font-bold text-secondary2">
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
            {/* stars container */}
            <RatingStars averageRating={averageRating} />
            {/* count */}
            <p className="text-lg font-bold text-black/50">({reviewsCount})</p>
          </div>
        </div>
      </Link>
      <div className="relative">
        {/* add to cart button - disappear when item is in cart */}
        <button
          className={`mt-2 block w-full rounded bg-black py-3 text-center text-text duration-300 hover:opacity-70`}
        >
          {isWishlistPage ? "Move to Cart" : "Add to Cart"}
        </button>

        {/* increase and decrease buttons container. Disappear when item not in cart  */}
        <div
          className={`absolute left-0 top-0 flex hidden w-full items-center justify-between text-center text-text`}
        >
          <button className="h-12 rounded bg-black px-3  text-2xl font-bold duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30">
            -
          </button>
          <p className="select-none text-2xl font-semibold text-black">0</p>
          <button className="h-12 rounded bg-black px-3 text-2xl font-bold  duration-300 hover:opacity-70">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
