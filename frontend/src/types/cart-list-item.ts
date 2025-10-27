import { ProductSize } from "@/constants/product-sizes";

export type CartListProduct = {
  id: number;
  label: string;
  image: string | null;
  price: number;
};

export type CartListItem = {
  product: CartListProduct;
  size: ProductSize;
  quantity: number;
};
