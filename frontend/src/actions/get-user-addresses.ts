"use server";

import { api } from "@/libs/axios";
import { Address } from "@/types/address";

export const getUserAddresses = async (token: string): Promise<Address[]> => {
  try {
    const response = await api.get("/user/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.addresses as Address[];
    }
  } catch {}
  return [];
};
