import Link from "next/link";

function MainCategory({ title }) {
  // ?c stands for category
  return (
    <li>
      <Link
        href={`/products?c=${title.toLowerCase()}`}
        className="inline-block whitespace-nowrap rounded border px-4 py-3 duration-200 hover:border-transparent hover:bg-yellow-200 md:border-none md:px-0 md:py-0 md:hover:bg-transparent md:hover:text-text1"
      >
        {title}
      </Link>
    </li>
  );
}

export default MainCategory;
