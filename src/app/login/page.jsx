import Image from "next/image";
import LoginForm from "./LoginForm";
import verifySession from "@/utils/verifySession";
import { redirect } from "next/navigation";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";
import { connectDB } from "@/utils/db";

async function Login() {
  await connectDB();
  const session = await verifySession("inPage");
  if (session?.isAuth) {
    redirect("/");
  }

  return (
    <main className="mb-36 mt-14" key={crypto.randomUUID()}>
      <div className="mx-auto grid max-w-[2000px] items-center lg:grid-cols-2 lg:gap-6 xl:gap-32">
        {/* grid item 1 - picture */}
        <div className="hidden bg-[#CBE4E8] lg:flex">
          <Image
            src={"/images/phone-beside-cart.png"}
            width={805}
            height={600}
            priority
            sizes="(min-width: 1024px) 50vw, 0vw"
            alt="Smartphone beside cart"
          />
        </div>

        {/* grid item 2 - form */}
        <LoginForm />
      </div>

      {/* reset count of items in wishlist and cart */}
      <UpdateItemsInBagCount />
    </main>
  );
}

export default Login;
