import { Product } from "@/types/products";
import { ProductItem } from "./layout/product-item";

type Props = {
  list: Product[];
};

export const ProductList = ({ list }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {list.map((item) => (
        <ProductItem key={item.id} data={item} />
      ))}
    </div>
  );
};
