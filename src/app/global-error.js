"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Xclusive Store",
  description: "One stop store for you exclusive needs",
};

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="grid min-h-[100vh] w-[100vw] grid-rows-[auto_1fr_auto] overflow-x-hidden bg-primary font-poppins text-text2">
        <Navbar />
        <main className="flex h-full flex-col items-center justify-center">
          <h3 className="mb-6 px-2 text-center">
            Something went wrong! Please try again
          </h3>
          <button className="btn2 mb-4" onClick={() => reset()}>
            Try again
          </button>
        </main>
        <Footer />
      </body>
    </html>
  );
}
