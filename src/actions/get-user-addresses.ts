"use server";

import { data } from "@/data";
import { Address } from "@/types/adress";

export const getUserAddresses = async (token: string): Promise<Address[]> => {
  return data.addresses;
};
