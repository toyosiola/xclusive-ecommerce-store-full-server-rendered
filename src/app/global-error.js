"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
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
      <body className="w-[100vw] min-h-[100vh] grid grid-rows-[auto_1fr_auto] overflow-x-hidden bg-primary font-poppins text-text2">
        <NavBar />
        <main className="flex items-center flex-col h-full justify-center">
          <h3 className="text-center mb-6 px-2">
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
