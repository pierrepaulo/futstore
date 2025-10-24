import { ProductSize } from "@/constants/product-sizes";

export type CartItem = {
  productId: number;
  size: ProductSize;
  quantity: number;
};
