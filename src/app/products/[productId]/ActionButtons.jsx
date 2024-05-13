import { HeartIcon } from "@/assets/icons";

export default function ActionButtons({ name, id }) {
  return (
    <>
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
      <button
        className="h-11 rounded border border-black/50 fill-white px-2 text-3xl duration-300 hover:bg-black/10"
        title={"Add to wishlist"}
      >
        <HeartIcon className="" />
      </button>
    </>
  );
}
