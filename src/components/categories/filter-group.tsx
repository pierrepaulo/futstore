"use client";

import Image from "next/image";
import { FilterItem } from "./filter-item";
import { useState } from "react";

export const FilterGroup = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <div className="flex-1 font-bold text-xl">Nome do grupo</div>
        <div
          onClick={() => setOpened(!opened)}
          className="size-8 flex justify-center items-center cursor-pointer"
        >
          <Image
            src={"/assets/ui/arrow-left-s-line.png"}
            alt=""
            width={24}
            height={24}
            className={`${opened ? "rotate-0" : "rotate-180"} transition-all`}
          ></Image>
        </div>
      </div>
      <div
        className={`overflow-y-hidden ${
          opened ? "max-h-96" : "max-h-0"
        } transition-all`}
      >
        <FilterItem id={1} label={"Item 1"} />
        <FilterItem id={2} label={"Item 2"} />
        <FilterItem id={3} label={"Item 3"} />
      </div>
    </div>
  );
};
