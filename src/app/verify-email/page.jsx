import User from "@/models/UserModel";
import { connectDB } from "@/utils/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function page({ searchParams: { t: token, e: email } }) {
  // t = verification token, e = email
  if (!token || !email) {
    redirect("/");
  }

  await connectDB();
  const user = await User.findOne({ email });
  const isValidToken = user?.verificationToken === token;

  if (!user || !isValidToken) {
    return (
      <main className="mb-36 mt-10 sm:mt-20">
        <div className="global-container flex items-center justify-center">
          <div className="product-shadow px-16 py-16 md:px-20 md:py-20">
            <h3 className="mb-4 text-center text-4xl text-button2 md:text-5xl">
              Invalid verification link!!!
            </h3>
          </div>
        </div>
      </main>
    );
  }

  // update user verification details
  user.isVerified = true;
  user.verificationToken = "";
  user.verificationDate = new Date();
  await user.save();

  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container flex items-center justify-center">
        <div className="product-shadow px-16 py-16 md:px-20 md:py-20">
          <h3 className="mb-4 text-center text-button1">Account verified!</h3>
          <p className="mb-4 text-base md:text-lg">
            Your account has been verified. You can now login
          </p>
          <Link href="/login" className="btn2 mx-auto">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
