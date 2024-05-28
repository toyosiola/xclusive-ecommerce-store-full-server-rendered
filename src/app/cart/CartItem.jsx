import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import RemoveFromCartForm from "./RemoveFromCartForm";
import CartQuantityForm from "./CartQuantityForm";

export default function CartItem({
  _id: id,
  name,
  price,
  images,
  discount,
  cartQuantity,
  quantityInStock,
}) {
  return (
    <>
      {/* For Small screens */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 md:hidden">
        {/* image  */}
        <div className="h-32 w-40 xs:h-[10rem] xs:w-[14rem]">
          <Image
            src={images[0]}
            width={338}
            height={253}
            alt={"camera"}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        {/* details */}
        <div className="flex flex-col gap-4 xs:gap-8">
          <h4 className="mt-1 font-bold">{name}</h4>
          <p className="text-base font-bold">{formatPrice(price, discount)}</p>
          <div className="">
            {/* to do - out of stock */}
            <p className="text-sm font-bold text-black/60"></p>
            <RemoveFromCartForm productId={id.toString()} />
          </div>
        </div>
        {/* buttons */}
        {/* item quantity buttons */}
        <CartQuantityForm
          {...{ cartQuantity, quantityInStock, productId: id.toString() }}
          smallScreen
        />
      </div>

      {/* For big screens */}
      <div className="product-shadow hidden grid-cols-4 place-items-center rounded px-4 py-6 md:grid">
        {/* grid item details */}
        <div className="flex place-items-center gap-5 self-start justify-self-start">
          {/* image container */}
          <div className="h-20 w-20 lg:w-28">
            <Image
              src={images[0]}
              width={338}
              height={253}
              alt={"camera"}
              className="h-full w-full object-cover"
            />
          </div>
          {/* details */}
          <div className="">
            <p className="mb-1">{name}</p>
            <RemoveFromCartForm productId={id.toString()} />
          </div>
        </div>

        {/* grid item price */}
        <p>{formatPrice(price, discount)}</p>

        {/* item quantity buttons */}
        <CartQuantityForm
          {...{ cartQuantity, quantityInStock, productId: id.toString() }}
        />
        {/* grid item - subtotal */}
        <p>{formatPrice(price * cartQuantity, discount)}</p>
      </div>
    </>
  );
}
