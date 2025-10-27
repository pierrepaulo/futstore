"use client";

import { getAuthState } from "@/actions/get-auth-state";
import { getCartState } from "@/actions/get-cart-state";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const StoreHydration = () => {
  const authStore = useAuthStore((state) => state);

  useEffect(() => {
    getAuthState().then(({ token }) => {
      if (token) authStore.setToken(token);
      authStore.setHydrated(true);
    });

    getCartState().then(({ cart }) => {
      if (cart.length > 0) {
        useCartStore.setState({ cart });
      }
    });
  }, []);
  return null;
};
