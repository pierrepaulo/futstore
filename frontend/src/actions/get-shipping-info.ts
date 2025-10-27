"use server";

import { api } from "@/libs/axios";

type ShippingInfoResponse = {
  zipcode: string;
  cost: number;
  days: number;
};
export const getShippingInfo = async (
  zipcode: string
): Promise<ShippingInfoResponse | false> => {
  try {
    const response = await api.get("/cart/shipping", { params: { zipcode } });
    if (response.status === 200) {
      return response.data as ShippingInfoResponse;
    }
  } catch {}
  return false;
};
