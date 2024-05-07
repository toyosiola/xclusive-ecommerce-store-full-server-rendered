import Link from "next/link";
import SearchInput from "./SearchInput";
import NavLink from "./NavLink";
import WishLIstCartLink from "./WishListCartLink";
import navLinks from "@/data/navLinks";

function NavBar() {
  return (
    <>
      <nav className="border-b pb-4 pt-10">
        <div className="global-container flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="font-inter text-2xl font-bold" rel="logo">
            Xclusive
          </Link>

          {/* Nav Links */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-12">
            {navLinks.map((link, index) => {
              return <NavLink key={index} {...link} />;
            })}
          </ul>

          <div className="hidden items-center gap-6 lg:flex">
            {/* Search container */}
            <div className="flex items-center gap-2 rounded bg-secondary px-3 text-xs">
              <SearchInput />
            </div>
            <WishLIstCartLink />
          </div>

          {/* <!-- Hamburger Button --> */}
          <button className="hamburger block lg:hidden" type="button">
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
