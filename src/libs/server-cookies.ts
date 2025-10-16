import { CartItem } from "@/types/cart-item";
import { cookies } from "next/headers";

//auth cookie
export const getServerAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
};

export const setServerAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, { httpOnly: true });
};

export const ClearServeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
};

//cart cookie
export const getServerCart = async (): Promise<CartItem[]> => {
  const cookieStore = await cookies();
  const value = cookieStore.get("cart")?.value;
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

export const setServerCart = async (cart: CartItem[]) => {
  const cookieStore = await cookies();
  cookieStore.set("cart", JSON.stringify(cart), { httpOnly: true });
};

export const clearServerCart = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("cart");
};
