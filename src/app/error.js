"use client";

import deleteSession from "@/utils/server-actions/deleteSession";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  // delete session if there was error in validating session
  useEffect(() => {
    if (error.message === ("Invalid session" || "User not found"))
      deleteSession();
  }, [error.message]);

  return (
    <main className="flex h-full flex-col items-center justify-center py-4">
      <h3 className="mb-6 px-2 text-center">
        Something went wrong! Please try again
      </h3>
      <button className="btn2 mb-4" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
