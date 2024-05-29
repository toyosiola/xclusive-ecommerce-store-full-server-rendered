"use client";

import { ArrowUpIcon } from "@/assets/icons";
import { useEffect, useRef, useState } from "react";

export default function BackToTopButton() {
  const [showArrow, setShowArrow] = useState(false);
  const arrowRef = useRef(null);

  // handle back to top button
  useEffect(() => {
    function buttonDisplayHandler() {
      if (window.scrollY > window.innerHeight * 3 && !showArrow) {
        setShowArrow(true);
      }

      if (window.scrollY < window.innerHeight * 3 && showArrow) {
        setShowArrow(false);
      }
    }

    window.addEventListener("scroll", buttonDisplayHandler);

    arrowRef.current.addEventListener(`click`, (e) => {
      const navbar = document.getElementById("top");
      window.scrollTo({
        left: 0,
        top: navbar,
        behavior: "smooth",
      });
    });

    return () => window.removeEventListener("scroll", buttonDisplayHandler);
  }, [showArrow]);

  return (
    <button
      ref={arrowRef}
      className={`button-shadow fixed bottom-11 right-12 animate-bounce cursor-default rounded-full bg-button2 p-3 text-2xl text-white md:right-20 ${showArrow ? "inline" : "hidden"}`}
    >
      <ArrowUpIcon />
    </button>
  );
}
