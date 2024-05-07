import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SendIcon,
  TwitterIcon,
} from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-black pt-20 text-center text-text sm:text-left">
      <div className="global-container ">
        <div className="mb-14 grid justify-center gap-4  gap-y-8  sm:grid-cols-2 sm:justify-between md:grid-cols-3 xl:grid-cols-5">
          {/* grid item 1 */}
          <div className="space-y-6 ">
            <Link href={"/"} className="font-inter text-2xl font-bold">
              Xclusive
            </Link>
            <p className="text-xl font-medium">Subscribe</p>
            <p>Get 10% off your first order</p>
            <div className="mx-auto mt-4 flex max-w-max items-center gap-2 rounded border border-text px-4 sm:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="max-w-[8rem] bg-transparent py-3 placeholder:text-text/40 focus:outline-none"
              />
              <SendIcon className="flex-none text-2xl" />
            </div>
          </div>

          {/* grid item 2 */}
          <div className="space-y-6">
            <h4 className="text-xl font-medium">Support</h4>
            <ul className="space-y-4">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>xclusive@mail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* grid item 2 */}
          <div className="space-y-6">
            <h4 className="text-xl font-medium">Account</h4>
            <ul className="space-y-4">
              <li>
                <Link href={"/#"}>My Account</Link>
              </li>
              <li>
                <Link href={"/login"}>Login / Register</Link>
              </li>
              <li>
                <Link href={"/cart"}>Cart</Link>
              </li>
              <li>
                <Link href={"/wishlist"}>Wishlist</Link>
              </li>
              <li>
                <Link href={"/products"}>Shop</Link>
              </li>
            </ul>
          </div>

          {/* grid item 3 */}
          <div className="space-y-6">
            <h4 className="text-xl font-medium">Quick Link</h4>
            <ul className="space-y-4">
              <li>
                <Link href={"#"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"#"}>Terms Of Use</Link>
              </li>
              <li>
                <Link href={"#"}>FAQ</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* grid item 3 */}
          <div className="">
            <h4 className="mb-6 text-xl font-medium">Download App</h4>
            <p className="mb-2 text-xs font-medium">
              Save $3 with App New User Only
            </p>
            {/* Images container */}
            <div className="mx-auto mb-6 flex max-w-max items-center gap-2 sm:mx-0 sm:max-w-none">
              <div className="">
                <Image
                  src={"/images/qr-code.png"}
                  width={80}
                  height={80}
                  alt="qr code"
                />
              </div>
              <div className="">
                <Image
                  src={"/images/googleplay-apple-store.png"}
                  width={110}
                  height={84}
                  alt="google play and apple store"
                />
              </div>
            </div>

            <div className="mx-auto flex max-w-max gap-4 text-xl sm:mx-0 sm:max-w-none">
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
              <LinkedInIcon />
            </div>
          </div>
        </div>

        <p className="pb-6 pt-4 text-center text-primary opacity-40">
          &copy; Copyright Xclusive 2023. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
