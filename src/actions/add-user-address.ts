"use server";

import { data } from "@/data";
import { Address } from "@/types/adress";

export const addUserAddres = async (
  token: string,
  address: Address
): Promise<Address[]> => {
  return data.addresses;
};
