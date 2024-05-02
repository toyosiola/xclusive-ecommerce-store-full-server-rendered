import Image from "next/image";
import allProducts from "@/data/productsData";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="grid min-h-screen justify-center grid-cols-1 gap-4">
      <div className="w-full relative h-full">
        <Image
          fill
          src={allProducts[0].images[0]}
          alt="image"
          className="object-cover"
          sizes="(min-width: 768px) 50vw, (min-width: 992px) 33vw, 100vw"
        />
      </div>
    </main>
  );
}
