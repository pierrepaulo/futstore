import { ProductSize, PRODUCT_SIZES } from "@/constants/product-sizes";
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
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    const validSizes = new Set<ProductSize>(PRODUCT_SIZES);

    const sanitized: CartItem[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const { productId, quantity, size } = item as {
        productId?: unknown;
        quantity?: unknown;
        size?: unknown;
      };

      if (
        typeof productId !== "number" ||
        typeof quantity !== "number" ||
        typeof size !== "string" ||
        !validSizes.has(size as ProductSize)
      ) {
        continue;
      }

      sanitized.push({ productId, quantity, size: size as ProductSize });
    }

    return sanitized;
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
