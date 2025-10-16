"use server";
import { CartItem } from "@/types/cart-item";

export const finishCart = async (
  token: string,
  addresId: number,
  cart: CartItem[]
) => {
  //todo: requisição para finalizar compra
  return "https://google.com";
};
