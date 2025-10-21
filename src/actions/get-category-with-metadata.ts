"use server";

import { api } from "@/libs/axios";
import { Category, CategoryMetadata } from "@/types/category";

type CategoryWithMetadata = {
  category: Category;
  metadata: CategoryMetadata[];
};
export const getCategoryWithMetadata = async (slug: string) => {
  try {
    const response = await api.get(`/category/${slug}/metadata`);
    if (response.status === 200 && !response.data.error) {
      return response.data as CategoryWithMetadata;
    }
  } catch {}
  return null;
};
