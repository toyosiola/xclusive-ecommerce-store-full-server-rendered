"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({ href, title }) {
  const segment = useSelectedLayoutSegment(); // returns null for homepage
  const pageRoute = "/" + (segment || "");

  return (
    <li className="group">
      <Link href={href} className={`hover:text-text1`}>
        <span className="inline-block px-2 pb-1">{title}</span>
        <div
          className={`h-1 bg-black duration-500 group-hover:w-full ${
            pageRoute === href ? "w-full" : "w-0"
          }`}
        ></div>
      </Link>
    </li>
  );
}
