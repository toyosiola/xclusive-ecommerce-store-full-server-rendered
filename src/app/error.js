"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // to do - style this page
  return (
    <main className="flex items-center flex-col h-full justify-center">
      <h3 className="text-center mb-6 px-2">
        Something went wrong! Please try again
      </h3>
      <button className="btn2 mb-4" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
