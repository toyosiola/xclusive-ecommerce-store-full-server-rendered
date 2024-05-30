import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { connectDB } from "@/utils/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalProvider from "@/contexts/providers/GlobalProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import verifySession from "@/utils/verifySession";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";

// fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// variable to differentiate dev/prod environment when necessary app-wide
export const devEnv = process.env.NODE_ENV === "development";

export const metadata = {
  title: "Xclusive Store",
  description: "One stop store for your exclusive needs",
};

export default async function RootLayout({ children }) {
  await connectDB();
  let user = null;
  const session = await verifySession("inPage");
  if (session?.isAuth) {
    user = { name: session.name };
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="grid min-h-[100vh] max-w-[100vw] grid-rows-[auto_1fr_auto] overflow-x-hidden bg-primary font-poppins text-text2">
        <GlobalProvider user={user}>
          <QueryClientProviderWrapper>
            <Navbar />
            {children}
            <Footer />
          </QueryClientProviderWrapper>
        </GlobalProvider>
        <ToastContainer position="top-center" theme="colored" />
      </body>
    </html>
  );
}
