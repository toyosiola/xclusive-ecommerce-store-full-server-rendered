import { SearchIcon } from "@/assets/icons";

export default function SearchInput() {
  return (
    <>
      <input
        type="search"
        className="grow bg-transparent px-1 py-3 focus:outline-none md:max-w-[8rem]"
        placeholder="What are you looking for?...not yet active :)"
      />
      <SearchIcon className="text-2xl" />
    </>
  );
}
