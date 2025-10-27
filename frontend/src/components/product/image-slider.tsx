"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};
export const ImageSlider = ({ images }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="max-w-sm mx-auto md:mx-0">
      <div className="border border-gray-300 bg-white p-14 ">
        <Image
          src={images[selectedImageIndex]}
          alt=""
          width={380}
          height={380}
          className="max-w-full"
        />
      </div>
      <div className="mt-6 grid grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`bg-white p-2 cursor-pointer border ${
              index === selectedImageIndex
                ? "border-blue-500"
                : "border-gray-300"
            } `}
          >
            <Image src={image} alt="" width={120} height={120} />
          </div>
        ))}
      </div>
    </div>
  );
};
