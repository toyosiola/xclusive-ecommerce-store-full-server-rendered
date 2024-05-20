"use client";

import { HeartIcon } from "@/assets/icons";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/utils/server-actions/wishlist";
import { toast } from "react-toastify";
import WishlistButton from "./WishlistButton";

export default function ActionButtons({ id, isInWishlist }) {
  return (
    <div className="flex flex-wrap items-center gap-4 lg:justify-between">
      <div className="flex items-center">
        {/* reduce quantity button */}
        <button
          type="button"
          className="flex h-11 w-10 items-center justify-center rounded-l border border-black/50 text-2xl duration-300 hover:border-button2 hover:bg-button2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
        >
          -
        </button>

        {/* quantity */}
        <p className="flex h-11 w-20 items-center justify-center border-y border-black/50 text-center text-xl">
          0
        </p>

        {/* increase quantity button */}
        <button
          type="button"
          className="flex h-11 w-10 items-center justify-center rounded-r border border-button2 bg-button2 text-2xl text-text duration-300 hover:border-black/50 hover:bg-transparent hover:text-inherit"
        >
          +
        </button>
      </div>

      {/* add to cart button */}
      <button
        className="btn2 py-o flex h-11 items-center disabled:cursor-not-allowed disabled:opacity-50"
        title={"Add to cart"}
      >
        Add to cart
      </button>

      {/* add to wishlist */}
      <form
        action={async () => {
          try {
            if (!isInWishlist) {
              const resp = await addToWishlist(id);
              if (resp.success)
                return toast.success(resp.message, { autoClose: 1500 });
              return toast.error(resp.message);
            }

            // remove from wishlist
            const resp = await removeFromWishlist(id);
            if (resp.success)
              return toast.success(resp.message, { autoClose: 1500 });
            toast.error(resp.message);
          } catch (error) {
            toast.error("Failed! Please check your internet connection");
          }
        }}
      >
        <WishlistButton isInWishlist={isInWishlist} />
      </form>
    </div>
  );
}
