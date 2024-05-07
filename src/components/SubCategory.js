import Link from "next/link";

function SubCategory({ icon, title }) {
  return (
    // change to link that filters out products in that category
    <Link
      href={`/products?c=${title.toLowerCase()}`}
      className="group flex h-36 w-[10.625rem] flex-none flex-col items-center justify-center gap-4 rounded border duration-300 hover:border-secondary2 hover:bg-secondary2"
    >
      <div className="text-6xl text-black duration-300 group-hover:text-text">
        {icon}
      </div>
      <p className="duration-300 group-hover:text-text">{title}</p>
    </Link>
  );
}

export default SubCategory;
