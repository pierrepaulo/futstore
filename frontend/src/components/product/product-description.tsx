"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  text: string;
};
export const ProductDescription = ({ text }: Props) => {
  const [opened, setOpened] = useState(true);

  return (
    <div className="bg-white border border-gray-200 px-7 md:px-12 mt-20">
      <div
        className={`flex justify-between items-center py-7 ${
          opened ? "border-b" : "border-0"
        } border-b-gray-200`}
      >
        <div className="text-2xl ">Informações do produto</div>
        <div
          onClick={() => setOpened(!opened)}
          className={`cursor-pointer size-14 border border-gray-200 flex justify-center items-center rounded-sm`}
        >
          <Image
            src={"/assets/ui/arrow-s-line.png"}
            alt=""
            width={24}
            height={24}
            className={`transition-all ${opened ? "rotate-0" : "rotate-180"}`}
          />
        </div>
      </div>
      {opened && <div className="text-gray-500 my-12">{text}</div>}
    </div>
  );
};
