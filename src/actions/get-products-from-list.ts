"use server";

import { api } from "@/libs/axios";
import { Product } from "@/types/product";

export const getProductsFromList = async (ids: (string | number)[]) => {
  try {
    const response = await api.post("/cart/mount", { ids });
    if (response.status === 200) {
      return response.data.products as Product[];
    }
  } catch {}
  return [];
};
