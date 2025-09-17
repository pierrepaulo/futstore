"use client";

import { clearCartCookie } from "@/actions/clear-card-cookie";
import { finishCart } from "@/actions/finishi.cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FinishiPurchaseButton = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const handleFinishiButton = async () => {
    if (!token || !cartStore.selectedAddresId) return;
    const sessionUrl = await finishCart(
      token,
      cartStore.selectedAddresId,
      cartStore.cart
    );
    if (sessionUrl) {
      await clearCartCookie();
      cartStore.clearCart();
      redirect(sessionUrl);
    } else "ocorreu um erro";
  };
  if (!hydrated) return null;
  if (!token) {
    return (
      <Link
        href={"/login"}
        className="block text-center px-5 py-4 bg-blue-600 text-white border-0 rounded-sm"
      >
        Faça login para finalizar
      </Link>
    );
  }

  return (
    <button
      disabled={!cartStore.selectedAddresId ? true : false}
      onClick={handleFinishiButton}
      className="w-full mb-4 mt-4 px-6 py-4 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-30"
    >
      {" "}
      Finalizar compra
    </button>
  );
};
