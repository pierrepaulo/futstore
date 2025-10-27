"use server";

import { clearServerCart } from "@/libs/server-cookies";

export const clearAuthCookie = async () => {
  await clearServerCart();
};
