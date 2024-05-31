import {
  ArrowRightIcon,
  ArrowUpIcon,
  CustomerServiceIcon,
  DeliveryServiceIcon,
  SecuredIcon,
} from "@/assets/icons";
import {
  BestSellingProductsSamples,
  FlashSalesProductsSamples,
  TopProductsSamples,
} from "@/components/FeaturedProducts";
import FlashSalesTimer from "@/components/FlashSalesTimer";
import LtdOfferTimer from "@/components/LtdOfferTimer";
import MainCategory from "@/components/MainCategory";
import ProductSkeleton from "@/components/ProductSkeleton";
import SectionTag from "@/components/SectionTag";
import SubCategory from "@/components/SubCategory";
import { mainCategories, subCategories } from "@/data/categories";
import { getSessionCart, getUserCart } from "@/utils/getCart";
import { getUserWishlist } from "@/utils/getWishlist";
import verifySession from "@/utils/verifySession";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import UpdateItemsInBagCount from "@/components/UpdateItemsInBagCount";

export default async function Home() {
  const verifiedSession = await verifySession("inPage");
  // get user wishlist
  let userWishlist,
    cart = {};

  // verifiedSession.isAuth is false if not-logged-in session exists
  if (verifiedSession && !verifiedSession?.isAuth) {
    // get session cart
    const sessionCart = await getSessionCart(verifiedSession.sessionId);
    // fill cart object with id and cartQuantity to avoid iterating in each singleProduct
    sessionCart?.forEach(
      ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
    );
  }

  if (verifiedSession?.isAuth) {
    userWishlist = getUserWishlist(verifiedSession.userId);
    let userCart = getUserCart(verifiedSession.userId);
    [userWishlist, userCart] = await Promise.all([userWishlist, userCart]);
    // fill cart object
    userCart.forEach(
      ({ product, cartQuantity }) => (cart[product.toString()] = cartQuantity),
    );
    // turn wishlist to an array of strings
    userWishlist = userWishlist.map((item) => item.product.toString());
  }

  return (
    <main className="relative">
      {/* HERO SECTION*/}
      <section>
        <div className="global-container gap-11 md:grid md:grid-cols-[auto_1fr]">
          {/* categories */}
          <ul className="flex justify-between gap-2 overflow-x-auto pt-10 md:block md:space-y-4 md:border-r md:pr-8 lg:w-56">
            {mainCategories.map((category) => (
              <MainCategory key={category.id} {...category} />
            ))}
          </ul>

          {/* Voucher */}
          <div className="mt-10 items-center justify-between gap-4 space-y-4 bg-black px-4 py-4 text-white md:flex md:space-y-0 lg:px-16">
            <div className="basis-1/2 space-y-5">
              {/* flex container */}
              <div className="flex items-center gap-6">
                <div>
                  <Image
                    src={"/images/apple_logo.png"}
                    alt="apple logo"
                    width={40}
                    height={49}
                  />
                </div>
                <p className="">iPhone 14 Series</p>
              </div>
              <h3 className="text-4xl font-semibold leading-tight lg:text-5xl">
                Up to 10% <br /> off Voucher
              </h3>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 hover:text-text1"
              >
                <span className="border-b duration-200 hover:border-b-transparent">
                  Shop Now
                </span>
                <ArrowRightIcon />
              </Link>
            </div>
            {/* Image container */}
            <div className="basis-1/2">
              <Image
                src="/images/hero_endframe.png"
                alt="iPhone 14 series"
                width={498}
                height={328}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FLASH SALES SECTION */}
      <section className="mb-20 mt-36">
        <div className="global-container  border-b pb-14">
          <SectionTag tag="Today's" />

          {/* Heading and countdown timer container */}
          <div className="heading-container">
            <h3>Flash Sales</h3>
            {/* Countdown timer */}
            <FlashSalesTimer />
          </div>

          {/* Flash sales products */}
          <Suspense fallback={<ProductSkeleton count={4} />}>
            <FlashSalesProductsSamples {...{ userWishlist, cart }} />
          </Suspense>

          {/* Link to view all flash sales */}
          <Link href="/products?category=flash sales" className="btn2 mx-auto">
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories section */}
      <section className="mb-20">
        <div className="global-container border-b pb-14">
          <SectionTag tag="Categories" />

          <div className="heading-container">
            <h3>Browse By Category</h3>
          </div>

          {/* Sub-categories container */}
          <div className="flex justify-between gap-8 overflow-x-auto">
            {subCategories.map((subC) => (
              <SubCategory key={subC.id} {...subC} />
            ))}
          </div>
        </div>
      </section>

      {/* Best selling section */}
      <section className="mb-20 md:mb-40">
        <div className="global-container border-b pb-14">
          <SectionTag tag="This Month" />

          {/* Link to view all best selling products */}
          <div className="heading-container flex justify-between">
            <h3>Best Selling Products</h3>
            <Link
              href={"/products?category=best selling"}
              className="btn2 hidden sm:block"
            >
              View All
            </Link>
          </div>

          {/* Best selling container */}
          <Suspense fallback={<ProductSkeleton count={4} />}>
            <BestSellingProductsSamples {...{ userWishlist, cart }} />
          </Suspense>
          {/* view all link for smaller screens only */}
          <Link
            href={"/products?category=best selling"}
            className="btn2 mx-auto sm:hidden"
          >
            View All
          </Link>
        </div>
      </section>

      {/* product on promo */}
      <section className="mb-16">
        <div className="global-container">
          <div className="items-center justify-between gap-4 space-y-4 bg-black px-4 py-10 text-white md:flex md:space-y-0 md:py-16 lg:px-16">
            <div className="basis-1/2 space-y-8 md:mt-0">
              <p className="font-semibold text-button1">Categories</p>
              <h2 className="text-3xl font-semibold leading-tight lg:text-5xl">
                Enhance Your Music Experience
              </h2>

              {/* Countdown timer */}
              <LtdOfferTimer />

              {/* go to single product */}
              <Link
                href={"/products/6633b2419fde965425a3e78f"}
                className="inline-block rounded bg-button1 px-12 py-4 text-text duration-300 hover:bg-hoverButton1"
              >
                Buy Now!
              </Link>
            </div>
            {/* Image container */}
            <div className="relative flex-none basis-1/2 ">
              {/* blur container */}
              <div className="absolute left-0 top-0 h-full w-full rounded-full bg-[#d9d9d9] opacity-30 blur-[100px]"></div>
              <Image
                src="https://res.cloudinary.com/dljhplesp/image/upload/v1714580748/xclusive-store/electronics/bluetooth-music-player_vmphek.png"
                alt="bluetooth speaker"
                width={600}
                height={420}
                className="relative"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top products section */}
      <section className="mb-36">
        <div className="global-container">
          <SectionTag tag="Our Products" />
          <h3 className="mb-14">Explore Our Products</h3>

          {/* products container */}
          <Suspense fallback={<ProductSkeleton count={4} />}>
            <TopProductsSamples {...{ userWishlist, cart }} />
          </Suspense>
          <Link href="/products" className="btn2 mx-auto">
            View All Products
          </Link>
        </div>
      </section>

      {/* Featured products section */}
      <section className="mb-36">
        <div className="global-container">
          <SectionTag tag="Featured" />
          <h3 className="mb-14">New Arrival</h3>

          {/* featured product container */}
          <div className="grid-cols-2 gap-4 space-y-4 md:grid md:space-y-0">
            {/* main grid item 1 - PS-5 container */}
            <div className="relative flex items-end bg-black px-4">
              <Image
                src="https://res.cloudinary.com/dljhplesp/image/upload/v1714580708/xclusive-store/electronics/ps5-slim_ziap6r.png"
                alt="PS 5"
                width={511}
                height={511}
              />
              <div className="absolute bottom-8 left-0 space-y-4 pl-8 text-text">
                <h4 className="text-2xl font-semibold leading-none">
                  Playstation 5
                </h4>
                <p className="text-sm">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <Link
                  href="/products/6633b2419fde965425a3e806"
                  className="inline-block border-b duration-200 hover:border-b-transparent hover:text-text1"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            {/* main grid item 2 */}
            <div className="space-y-4">
              {/* Woman image container */}
              <div className="relative bg-black">
                <Image
                  src="/images/attractive-woman-wearing-hat-posing-black.png"
                  alt="woman wearing hat"
                  width={432}
                  height={284}
                />
                <div className="absolute bottom-8 left-0 space-y-4 pl-8 text-text">
                  <h4 className="text-2xl font-semibold leading-none">
                    Women&apos;s Collections
                  </h4>
                  <p className="text-sm">
                    Featured woman collections that give you another vibe.
                  </p>
                  <Link
                    href="/products?category=women"
                    className="inline-block border-b duration-200 hover:border-b-transparent hover:text-text1"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              {/* sub grid container */}
              <div className="grid-cols-2 gap-4 space-y-4 xs:grid xs:space-y-0">
                <div className="relative bg-black px-10 py-8">
                  <Image
                    src="https://res.cloudinary.com/dljhplesp/image/upload/v1714580735/xclusive-store/electronics/amazon-echo_mgll44.png"
                    alt="amazon echo"
                    width={190}
                    height={221}
                    className="object-cover"
                  />
                  <div className="absolute bottom-8 left-0 space-y-4 pl-4 text-text sm:pl-8">
                    <h4 className="text-2xl font-semibold leading-none">
                      Speakers
                    </h4>
                    <p className="text-sm">Amazon wireless speakers </p>
                    <Link
                      href="/products/6633b2419fde965425a3e80c"
                      className="inline-block border-b duration-200 hover:border-b-transparent hover:text-text1"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="relative bg-black px-8 py-9">
                  <Image
                    src="https://res.cloudinary.com/dljhplesp/image/upload/v1714583137/xclusive-store/men-fashion/gucci-perfume_npyffj.png"
                    alt="gucci perfume"
                    width={201}
                    height={203}
                    className="object-cover"
                  />
                  <div className="absolute bottom-8 left-0 space-y-4 pl-4 text-text sm:pl-8">
                    <h4 className="text-2xl font-semibold leading-none">
                      Perfume
                    </h4>
                    <p className="text-sm">GUCCI INTENSE OUD EDP </p>
                    <Link
                      href="/products/663a3352590573306648bf1c"
                      className="inline-block border-b duration-200 hover:border-b-transparent hover:text-text1"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR OFFERS */}
      <section className="pb-36">
        <div className="global-container grid max-w-5xl place-items-center gap-6 sm:grid-cols-3 lg:px-0">
          <div className="flex max-w-max flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary1/30 p-3">
              <div className="rounded-full bg-black p-2 text-4xl text-text">
                <DeliveryServiceIcon />
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-xl font-semibold">FREE AND FAST DELIVERY</h5>
              <p className="text-sm">Free delivery for all orders over $140</p>
            </div>
          </div>
          <div className="flex max-w-max flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary1/30 p-3">
              <div className="rounded-full bg-black p-2 text-4xl text-text">
                <CustomerServiceIcon />
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-xl font-semibold">24/7 CUSTOMER SERVICE</h5>
              <p className="text-sm">Friendly 24/7 customer support</p>
            </div>
          </div>
          <div className="flex max-w-max flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary1/30 p-3">
              <div className="rounded-full bg-black p-2 text-4xl text-text">
                <SecuredIcon />
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-xl font-semibold">MONEY BACK GUARANTEE</h5>
              <p className="text-sm">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* back to top button */}
      <Link
        href="#top"
        className="absolute bottom-11 right-12 rounded-full bg-secondary p-3 text-2xl text-black md:right-20"
      >
        <ArrowUpIcon />
      </Link>

      {/* update count of items in wishlist and cart */}
      <UpdateItemsInBagCount
        cartCount={Object.keys(cart).length}
        wishlistCount={userWishlist?.length}
      />
    </main>
  );
}
