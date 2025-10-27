"use server";

import { api } from "@/libs/axios";
import { Address } from "@/types/address";
import { getUserAddresses } from "./get-user-addresses";

export const addUserAddress = async (
  token: string,
  address: Address
): Promise<Address[]> => {
  try {
    const response = await api.post(
      "/user/addresses",
      { ...address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      return getUserAddresses(token);
    }
  } catch {}
  return [];
};
