"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  text: string;
};

export const ProductDescription = ({ text }: Props) => {
  const [opened, setOpened] = useState(true);
  return (
    <div className="bg-white border border-gray-200 px-7 md:px-12  mt-20">
      <div
        className={`flex justify-between py-7 items-center ${
          opened ? "border-b" : "border-0"
        } border-b border-gray-200`}
      >
        <div className="text-xl ">Informações do produto</div>
        <div
          onClick={() => setOpened(!opened)}
          className="cursor-pointer size-12  border border-gray-200 flex justify-center items-center rounded-sm"
        >
          <Image
            src={"/assets/ui/arrow-left-s-line.png"}
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
