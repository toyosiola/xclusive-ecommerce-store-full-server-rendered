import { IconImageAlt } from "@/assets/icons";

export default function ProductSkeleton({ count, isProductsPage }) {
  return (
    <div
      className={`mb-14 grid-cols-2 place-items-center gap-4 space-y-10 sm:grid sm:space-y-0 lg:grid-cols-3 ${
        isProductsPage ? "gap-y-14" : "gap-y-4 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {Array.from({ length: count }, (_, index) => (
        <SingleProductSkeleton key={index} />
      ))}
    </div>
  );
}

function SingleProductSkeleton() {
  return (
    <div className="mx-auto w-[20rem] max-w-full animate-pulse overflow-x-hidden sm:mx-0">
      <div className="flex h-[12.8125rem] items-center justify-center rounded-lg bg-gray-200">
        <IconImageAlt className="text-8xl text-gray-400" />
      </div>
      <div className="mb-2 mt-4 h-7 w-full rounded-sm bg-gray-300"></div>
      <div className="h-7 w-full rounded-sm bg-gray-300"></div>
      <div className="mt-2 h-12 w-full rounded bg-gray-300"></div>
    </div>
  );
}
