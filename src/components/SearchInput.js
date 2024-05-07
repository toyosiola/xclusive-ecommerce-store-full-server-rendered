import { SearchIcon } from "@/assets/icons";

export default function SearchInput({ className }) {
  return (
    <>
      <input
        type="search"
        className="bg-transparent px-1 py-3 focus:outline-none md:max-w-[8rem]"
        placeholder="What are you looking for?"
      />
      <SearchIcon className="text-2xl" />
    </>
  );
}
