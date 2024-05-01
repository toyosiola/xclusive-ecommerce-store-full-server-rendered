import Image from "next/image";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="grid min-h-screen justify-center grid-cols-3 gap-4 p-24">
      <div className="w-full relative h-full">
        <Image
          fill
          src="https://res.cloudinary.com/dljhplesp/image/upload/v1714574381/xclusive-store/pexels-hemakumar-j-10346738_rvpdid.jpg"
          alt="image"
          className="object-cover"
          sizes="(min-width: 768px) 50vw, (min-width: 992px) 50vw, 100vw"
        />
      </div>
      <div className="w-full relative h-full">
        <Image
          fill
          src="https://res.cloudinary.com/dljhplesp/image/upload/v1714574381/xclusive-store/pexels-hemakumar-j-10346738_rvpdid.jpg"
          alt="image"
          className="object-cover"
          sizes="(min-width: 768px) 50vw, (min-width: 992px) 50vw, 100vw"
        />
      </div>
      <div className="w-full relative h-full">
        <Image
          fill
          src="https://res.cloudinary.com/dljhplesp/image/upload/v1714574381/xclusive-store/pexels-hemakumar-j-10346738_rvpdid.jpg"
          alt="image"
          className="object-cover"
          sizes="(min-width: 768px) 50vw, (min-width: 992px) 50vw, 100vw"
        />
      </div>
      {/* <div className="w-full relative h-20">
        <Image
          fill
          src="https://res.cloudinary.com/dljhplesp/image/upload/v1714574381/xclusive-store/pexels-hemakumar-j-10346738_rvpdid.jpg"
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
        />
      </div>
      <div className="w-full relative h-20">
        <Image
          fill
          src="https://res.cloudinary.com/dljhplesp/image/upload/v1714574381/xclusive-store/pexels-hemakumar-j-10346738_rvpdid.jpg"
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
        />
      </div> */}
    </main>
  );
}
