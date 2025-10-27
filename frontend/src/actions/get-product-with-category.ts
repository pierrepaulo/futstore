"use server";

import { api } from "@/libs/axios";
import { Category } from "@/types/category";
import { ProductComplete } from "@/types/product";

export const getProductWithCategory = async (id: number) => {
  try {
    const response = await api.get(`/product/${id}`);
    if (response.status === 200) {
      return {
        product: response.data.product as ProductComplete,
        category: response.data.category as Category,
      };
    }
  } catch {}
  return null;
};
