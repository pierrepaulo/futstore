import { ProductSize } from "./product-size";

export type CartItem = {
  productId: number;
  size: ProductSize;
  quantity: number;
};
