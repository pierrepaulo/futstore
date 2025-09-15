type Props = {
  id: number;
  label: string;
};

export const FilterItem = ({ id, label }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <input type="checkbox" className="size-6" id={`ck-${id}`} />
      <label htmlFor={`ck-${id}`} className="text-lg text-gray-500">
        {label}
      </label>
    </div>
  );
};
