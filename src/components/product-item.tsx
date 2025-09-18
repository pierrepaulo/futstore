"use client";

import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  data: Product;
};

export const ProductItem = ({ data }: Props) => {
  const [liked, setLiked] = useState(data.liked);
  const link = `/product/${data.id}`;
  const toggleLiked = () => {
    setLiked(!liked);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6">
      <div className="flex justify-end">
        <div
          onClick={toggleLiked}
          className="size-12 border border-gray-200 rounded-sm flex justify-center items-center cursor-pointer"
        >
          {liked && (
            <Image
              src={"/assets/ui/heart-3-fill.png"}
              alt=""
              width={24}
              height={24}
            />
          )}
          {!liked && (
            <Image
              src={"/assets/ui/heart-3-line.png"}
              alt=""
              width={24}
              height={24}
            />
          )}
        </div>
      </div>
      <div className=" flex justify-center ">
        <Link href={link} className="block w-full">
          <div className="relative w-full aspect-square">
            <Image
              src={data.image}
              alt={data.label}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              priority={false}
            />
          </div>
        </Link>
      </div>
      <div className="mt-8 text-lg font-bold">
        <Link href={link}> {data.label} </Link>
      </div>
      <div className="mt-2 text-2xl font-bold text-blue-600">
        <Link href={link}>R$ {data.price.toFixed(2)} </Link>
      </div>
      <div className="mt-4 text-gray-400">Em até 12x no cartão</div>
    </div>
  );
};
