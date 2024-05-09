import { IconImageAlt } from "@/assets/icons";

export default function ProductSkeleton() {
  return (
    <div className="mb-14 place-items-center gap-4 gap-y-4 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <SingleProductSkeleton key={index} />
      ))}
    </div>
  );
}

function SingleProductSkeleton() {
  return (
    <div className="mx-auto w-[20rem] max-w-full overflow-x-hidden sm:mx-0 animate-pulse">
      <div className="h-[12.8125rem] rounded-lg bg-gray-200 flex items-center justify-center">
        <IconImageAlt className="text-gray-400 text-8xl" />
      </div>
      <div className="mb-2 mt-4 w-full h-7 rounded-sm bg-gray-300"></div>
      <div className="w-full h-7 rounded-sm bg-gray-300"></div>
      <div className="mt-2 w-full rounded h-12 bg-gray-300"></div>
    </div>
  );
}
