"use server";

import { api } from "@/libs/axios";
import { CartItem } from "@/types/cart-item";
import { CartListProduct } from "@/types/cart-list-item";
import { ProductSize } from "@/constants/product-sizes";

type MountedCartItem = {
  product: CartListProduct;
  size: ProductSize;
};

export const getProductsFromList = async (
  items: CartItem[]
): Promise<MountedCartItem[]> => {
  try {
    const response = await api.post("/cart/mount", { items });
    if (response.status === 200) {
      return response.data.items as MountedCartItem[];
    }
  } catch {}
  return [];
};
