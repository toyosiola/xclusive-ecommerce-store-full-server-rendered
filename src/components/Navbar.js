import Link from "next/link";
import SearchInput from "./SearchInput";
import NavLink from "./NavLink";
import NavIcons from "./NavIcons";
import navLinks from "@/data/navLinks";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <nav className="border-b pb-4 pt-8" id="top">
        <div className="global-container flex items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="font-inter text-xl font-bold lg:text-2xl"
            rel="logo"
          >
            Xclusive
          </Link>

          {/* Nav Links */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-12">
            {navLinks.map((link) => {
              return <NavLink key={crypto.randomUUID()} {...link} />;
            })}
          </ul>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {/* Search container */}
              <div className="hidden items-center gap-2 rounded bg-secondary px-3 text-xs lg:flex">
                <SearchInput />
              </div>
              <NavIcons />
            </div>

            <Sidebar />
          </div>
        </div>
      </nav>
    </>
  );
}
