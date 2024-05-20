"use client";

import navLinks from "@/data/navLinks";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import { IconLogout } from "@/assets/icons";
import logout from "@/utils/server-actions/logout";

export default function Sidebar() {
  const { user, dispatch } = useGlobalContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {/* user menu - show on large screens when user is logged in */}
      {user && <UserMenu />}

      {/* open sidebar Hamburger Button - for small screens --> */}
      <button
        className={`hamburger block lg:hidden ${isSidebarOpen ? "opacity-0" : ""}`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>

      {/* sidebar for small screens */}
      <section
        className={`fixed inset-0 z-30 max-w-[100vh] overflow-hidden duration-300 lg:hidden ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          className="absolute left-0 top-0 h-full w-full bg-black/20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`relative h-full w-96 max-w-[85vw] -translate-x-full bg-gray-100 duration-300 ${isSidebarOpen ? "translate-x-0" : ""}`}
        >
          {/* Logo */}
          <div className="relative mb-5 flex items-center justify-between border-b border-gray-300 bg-white px-2 pb-4 pt-10">
            <Link
              href={"/"}
              className="inline-block font-inter text-xl font-bold"
              rel="logo"
            >
              Xclusive
            </Link>

            {/* close sidebar Hamburger Button */}
            <button
              className={`hamburger block lg:hidden ${isSidebarOpen ? "close" : ""}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>

          {/* Nav Links */}
          <ul className="mb-5 border-y border-gray-300 bg-white px-2">
            {navLinks.map(({ href, title }) => {
              return user && href === "/login" ? null : (
                <li
                  key={crypto.randomUUID()}
                  className="border-b border-gray-200 last:border-b-0 "
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Link
                    href={href}
                    className="block py-3 duration-200 hover:bg-gray-50 hover:pl-1"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* logout button for small screens */}
          {user && (
            <div className="mb-5 border-y border-gray-300 bg-white px-2">
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  dispatch({ type: SET_USER, payload: null });
                }}
                className="flex w-full items-center gap-2 py-3 pl-1 text-button2 duration-300 hover:pl-3 hover:text-hoverButton"
              >
                <IconLogout className="rotate-180 text-2xl" />
                <p className="font-semibold tracking-wide">Logout</p>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
