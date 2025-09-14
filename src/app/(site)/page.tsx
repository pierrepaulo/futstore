import { Banners } from "@/components/home/banners";
import { MostSoldProducts } from "@/components/home/most-sold-products";
import { MostViewedProducts } from "@/components/home/most-viewed-products";
import { ProductListSkeleton } from "@/components/home/product-list-skeleton";
import { data } from "@/data";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="pb-96">
      <Banners list={data.banners} />
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-12">
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/truck-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Frete Grátis</div>
            <div className="text-gray-500">Para todo Brasil.</div>
          </div>
        </div>
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/discount-percent-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Muitas Ofertas</div>
            <div className="text-gray-500">Ofertas imbatíveis.</div>
          </div>
        </div>
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/arrow-left-right-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Troca fácil</div>
            <div className="text-gray-500">Em ate 30 dias</div>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <MostViewedProducts />
      </Suspense>
      <Suspense fallback={<ProductListSkeleton />}>
        <MostSoldProducts />
      </Suspense>
    </div>
  );
}
