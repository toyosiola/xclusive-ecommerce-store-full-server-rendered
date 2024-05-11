"use client";

import navLinks from "@/data/navLinks";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {/* open sidebar Hamburger Button --> */}
      <button
        className={`hamburger block lg:hidden ${isSidebarOpen ? "opacity-0" : ""}`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>

      <section
        className={`fixed inset-0 z-30 max-w-[100vh] -translate-x-full overflow-hidden duration-300 lg:hidden ${isSidebarOpen ? "translate-x-0" : ""}`}
      >
        <div
          className="absolute left-0 top-0 h-full w-full bg-black/10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div className="relative h-full w-96 max-w-full bg-gray-100">
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
          <ul className="border-y border-gray-300 bg-white px-2">
            {navLinks.map(({ href, title }) => {
              return (
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
        </div>
      </section>
    </>
  );
}
