import Image from "next/image";
import {
  CustomerServiceIcon,
  DeliveryServiceIcon,
  InstagramIcon,
  LinkedInIcon,
  MoneyBagIcon,
  SaleIcon,
  SecuredIcon,
  ShopIcon,
  ShoppingBagIcon,
  TwitterIcon,
} from "@/assets/icons";
import BreadCrumb from "@/components/BreadCrumb";

function About() {
  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="About" />
      </div>

      {/* OUR STORY */}
      <section className="mb-24 md:mb-36">
        <div className="global-container grid items-center gap-y-10 md:grid-cols-2 md:pr-0">
          <div className="md:pr-6 lg:pr-20">
            <h3 className="mb-10">Our Story</h3>
            <div className="space-y-6">
              <p>
                Launched in 2023, Xclusive is South Asia&apso;s premier online
                shopping market place with an active presence in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Xclusive has 10,500 sellers and 300 brands and serves
                3 millions customers across the region.
              </p>
              <p>
                Xclusive has more than 1 Million products to offer, growing at a
                very fast. Xclusive offers a diverse assortment in categories
                ranging from consumer.
              </p>
            </div>
          </div>
          {/* image container */}
          <div className="">
            <Image
              src="/images/two-african-females-holding-shopping-bags.png"
              alt="Two females holding shopping bags while reacting to something their smartphone"
              priority
              width={705}
              height={609}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* OUR STATS */}
      <section className="mb-24 md:mb-36">
        <div className="global-container">
          <div className="gap-4 space-y-6 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-4">
            {/* Single stat */}
            <div className="group mx-auto flex h-[14.375rem] max-w-[16.875rem] flex-col items-center justify-center rounded border border-black/30 text-center duration-300 hover:border-button2 hover:bg-button2 sm:mx-0">
              <div className="mb-6 rounded-full bg-primary1/30 p-3 duration-300 group-hover:bg-hoverButton">
                <div className="rounded-full bg-black p-2 text-4xl text-text duration-300 group-hover:bg-white group-hover:text-black">
                  <ShopIcon />
                </div>
              </div>

              <h4 className="sm:text3xl mb-3 text-2xl font-bold duration-300 group-hover:text-text">
                10.5k
              </h4>
              <p className="text-sm duration-300 group-hover:text-text">
                Active Sellers
              </p>
            </div>

            {/* Single stat */}
            <div className="group mx-auto flex h-[14.375rem] max-w-[16.875rem] flex-col items-center justify-center rounded border border-black/30 text-center duration-300 hover:border-button2 hover:bg-button2 sm:mx-0">
              <div className="mb-6 rounded-full bg-primary1/30 p-3 duration-300 group-hover:bg-hoverButton">
                <div className="rounded-full bg-black p-2 text-4xl text-text duration-300 group-hover:bg-white group-hover:text-black">
                  <SaleIcon />
                </div>
              </div>

              <h4 className="sm:text3xl mb-3 text-2xl font-bold duration-300 group-hover:text-text">
                33k
              </h4>
              <p className="text-sm duration-300 group-hover:text-text">
                Monthly Product Sale
              </p>
            </div>

            {/* Single stat */}
            <div className="group mx-auto flex h-[14.375rem] max-w-[16.875rem] flex-col items-center justify-center rounded border border-black/30 text-center duration-300 hover:border-button2 hover:bg-button2 sm:mx-0">
              <div className="mb-6 rounded-full bg-primary1/30 p-3 duration-300 group-hover:bg-hoverButton">
                <div className="rounded-full bg-black p-2 text-4xl text-text duration-300 group-hover:bg-white group-hover:text-black">
                  <ShoppingBagIcon />
                </div>
              </div>

              <h4 className="sm:text3xl mb-3 text-2xl font-bold duration-300 group-hover:text-text">
                45.5k
              </h4>
              <p className="text-sm duration-300 group-hover:text-text">
                Active Customers
              </p>
            </div>

            {/* Single stat */}
            <div className="group mx-auto flex h-[14.375rem] max-w-[16.875rem] flex-col items-center justify-center rounded border border-black/30 text-center duration-300 hover:border-button2 hover:bg-button2 sm:mx-0">
              <div className="mb-6 rounded-full bg-primary1/30 p-3 duration-300 group-hover:bg-hoverButton">
                <div className="rounded-full bg-black fill-none p-2 text-4xl text-text duration-300 group-hover:bg-white group-hover:text-black">
                  <MoneyBagIcon />
                </div>
              </div>

              <h4 className="sm:text3xl mb-3 text-2xl font-bold duration-300 group-hover:text-text">
                25k
              </h4>
              <p className="text-sm duration-300 group-hover:text-text">
                Annual gross sale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STAFFS */}
      <section className="mb-24 md:mb-36">
        <div className="global-container">
          <div className="gap-8 space-y-6 sm:grid sm:grid-cols-2 sm:space-y-0 md:grid-cols-3">
            {/* single card */}
            <div className="">
              {/* image container */}
              <div className="mb-8">
                <Image
                  src={"/images/tom-cruise.png"}
                  alt="Tom Cruise"
                  width={370}
                  height={430}
                  sizes="(min-width: 640px) 50vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <p className="mb-2 text-3xl font-medium">Tom Cruise</p>
              <p className="mb-4">Founder & Chairman</p>
              {/* socials container */}
              <div className="flex items-center gap-4 fill-none text-2xl">
                <TwitterIcon /> <InstagramIcon /> <LinkedInIcon />
              </div>
            </div>

            {/* single card */}
            <div className="">
              {/* image container */}
              <div className="mb-8">
                <Image
                  src={"/images/emma-watson.png"}
                  alt="Emma Watson"
                  width={370}
                  height={430}
                  sizes="(min-width: 640px) 50vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <p className="mb-2 text-3xl font-medium">Emma Watson</p>
              <p className="mb-4">Managing Director</p>
              {/* socials container */}
              <div className="flex items-center gap-4 fill-none text-2xl">
                <TwitterIcon /> <InstagramIcon /> <LinkedInIcon />
              </div>
            </div>

            {/* single card */}
            <div className="">
              {/* image container */}
              <div className="mb-8">
                <Image
                  src="/images/will-smith.png"
                  alt="Tom Cruise"
                  width={370}
                  height={430}
                  sizes="(min-width: 640px) 50vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <p className="mb-2 text-3xl font-medium">Will Smith</p>
              <p className="mb-4">Product Designer</p>
              {/* socials container */}
              <div className="flex items-center gap-4 fill-none text-2xl">
                <TwitterIcon /> <InstagramIcon /> <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR OFFERS */}
      <section className="mb-24 md:mb-36">
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
    </main>
  );
}

export default About;
