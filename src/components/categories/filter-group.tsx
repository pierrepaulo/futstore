import { FilterItem } from "./filter-item";

export const FilterGroup = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex-1 font-bold text-xl">Nome do grupo</div>
        <div className="">...</div>
      </div>
      <div className="pt-8 flex flex-col gap-4">
        <FilterItem id={1} label={"Item 1"} />
        <FilterItem id={2} label={"Item 2"} />
        <FilterItem id={3} label={"Item 3"} />
      </div>
    </div>
  );
};
