"use client";

import { ChevronDownIcon, ChevronRightIcon } from "@/assets/icons";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";

function CartItem({ _id: id, name, price, images, discount, cartQuantity }) {
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
            <button
              className="font-semibold text-button2 hover:text-hoverButton"
              title="Remove item"
              // onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </div>
        </div>
        {/* buttons */}
        {/* grid item quantity */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* increase button */}
          <button
            className="rotate-180 rounded border border-black/30 p-1 text-2xl font-semibold text-button2 duration-200 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
            // onClick={() => cartItemQuantityHandler(id, "increase")}
          >
            <ChevronDownIcon />
          </button>
          <p className="text-lg">{cartQuantity}</p>
          {/* increase button */}
          <button
            className="rounded border border-black/30 p-1 text-2xl font-semibold text-button2 duration-200 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/30 disabled:hover:bg-transparent"
            disabled={cartQuantity < 2 ? true : false}
            // onClick={() => cartItemQuantityHandler(id, "reduce")}
          >
            <ChevronDownIcon />
          </button>
        </div>
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
            <h4 className="">{name}</h4>
            <button
              className="font-medium text-button2 hover:text-hoverButton"
              title="Remove item"
              // onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </div>
        </div>

        {/* grid item price */}
        <p>{formatPrice(price, discount)}</p>

        {/* grid item quantity */}
        {/* buttons */}
        <div className="flex items-center gap-2">
          {/* Reduce button */}
          <button
            className="rotate-180 rounded border border-black/30 p-1 text-2xl font-semibold text-button2 duration-200 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/30 disabled:hover:bg-transparent"
            disabled={cartQuantity < 2 ? true : false}
            // onClick={() => cartItemQuantityHandler(id, "reduce")}
          >
            <ChevronRightIcon />
          </button>

          {/* Quantity */}
          <p className="text-lg">{cartQuantity}</p>

          {/* Increase button */}
          <button
            className="rounded border border-black/30 p-1 text-2xl font-semibold text-button2 duration-200 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
            // onClick={() => cartItemQuantityHandler(id, "increase")}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* grid item - subtotal */}
        <p>{formatPrice(price * cartQuantity, discount)}</p>
      </div>
    </>
  );
}

export default CartItem;
