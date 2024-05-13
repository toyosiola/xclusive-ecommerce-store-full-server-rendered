import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import ActionButtons from "./ActionButtons";
import RatingStars from "@/components/RatingStars";
import Product from "@/models/ProductModel";
import formatPrice from "@/utils/formatPrice";
import { connectDB } from "@/utils/db";

// generate pages that are not pregenerated on demand
export const dynamicParams = true;

// pregenerate few pages
export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}, { _id: 1 }).limit(10);

  return products.map((product) => ({ productId: product._id.toString() }));
}

export default async function SingleProductPage({ params: { productId } }) {
  await connectDB();
  const product = await Product.findOne({ _id: productId }).select(
    "name price averageRating reviewsCount images description discount",
  );

  const {
    _id: id,
    name,
    price,
    averageRating,
    reviewsCount,
    images,
    description,
    discount,
  } = product;

  return (
    <main className="mb-36 mt-10 sm:mt-20">
      <div className="global-container">
        <BreadCrumb page="Product" product={name} />

        {/* Product container */}
        <div className="grid-cols-2 gap-4 space-y-8 md:grid md:space-y-0 lg:gap-16">
          {/* Product image container */}
          <div className="">
            <Image
              src={images[0]}
              width={640}
              height={640}
              alt={name}
              className="h-auto w-auto object-cover"
            />
          </div>

          {/* Product details */}
          <div className="">
            <h3 className="mb-4 capitalize">{name}</h3>

            <div className="mb-4 flex items-center gap-2 text-lg">
              {/* rating */}
              {/* stars container */}
              <RatingStars averageRating={averageRating} />
              {/* count */}
              <p className="text-lg text-black/50">{`(${reviewsCount} Reviews)`}</p>
              <span>|</span> <span className="text-button1">In stock</span>
            </div>

            <p className="mb-6 flex flex-wrap gap-4 text-2xl">
              {formatPrice(price, discount)}
              {discount && (
                <span className=" text-black/50 line-through decoration-black/50">
                  {formatPrice(price)}
                </span>
              )}
            </p>
            {/* product description */}
            <p className="mb-10">{description}</p>
            <hr className="mb-10 w-full border border-black/50" />

            {/* buttons container */}
            <div className="flex flex-wrap items-center gap-4 lg:justify-between">
              {/* quantity container */}
              <ActionButtons name={name} id={id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
