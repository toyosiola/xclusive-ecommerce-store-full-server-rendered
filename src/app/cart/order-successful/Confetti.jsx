"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // set window size on render
    handleWindowSize();

    // update window size state on window resize
    window.addEventListener("resize", handleWindowSize);

    // hide confetti after 5 seconds and remove event lister
    setTimeout(() => {
      setShowConfetti(false);
      window.removeEventListener("resize", handleWindowSize);
    }, 8000);

    // cleanup event listener
    () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={1200}
        />
      )}
    </>
  );
}
