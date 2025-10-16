"use client";

import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { finishCart } from "@/actions/finish-cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FinishPurchaseButton = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);

  const handleFinishButton = async () => {
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
    } else {
      alert("Occoreu um erro");
    }
  };

  if (!hydrated) return null;

  if (!token) {
    return (
      <Link
        className="block w-full text-center px-5 py-4 bg-blue-600 text-white border-0 rounded-sm"
        href={"/login"}
      >
        Faça login para finalizar
      </Link>
    );
  }

  return (
    <button
      disabled={!cartStore.selectedAddresId ? true : false}
      onClick={handleFinishButton}
      className="w-full text-center px-5 py-4 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-20"
    >
      Finalizar Compra
    </button>
  );
};
