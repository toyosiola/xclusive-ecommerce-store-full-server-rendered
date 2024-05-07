import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { connectDB } from "@/utils/db";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// variable to differentiate dev/prod environment when necessary app-wide
export const developmentEnv = process.env.NODE_ENV === "development";

export const metadata = {
  title: "Xclusive Store",
  description: "One stop store for you exclusive needs",
};

export default async function RootLayout({ children }) {
  await connectDB();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="max-w-[100vw] min-h-[100vh] grid grid-rows-[auto_1fr_auto] overflow-x-hidden bg-primary font-poppins text-text2">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
