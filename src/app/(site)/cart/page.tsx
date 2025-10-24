import { getCartState } from "@/actions/get-cart-state";
import { getProductsFromList } from "@/actions/get-products-from-list";
import { CartContainer } from "@/components/cart/cart-container";
import { CartListItem } from "@/types/cart-list-item";
import { redirect } from "next/navigation";

export default async function Page() {
  const { cart: initialCart } = await getCartState();

  if (initialCart.length === 0) {
    redirect("/");
    return null;
  }

  let cartProducts: CartListItem[] = [];
  let subtotal: number = 0;

  const mountedItems = await getProductsFromList(initialCart);

  for (let cartItem of initialCart) {
    const matchedItem = mountedItems.find(
      (mounted) =>
        mounted.product.id === cartItem.productId && mounted.size === cartItem.size
    );

    if (matchedItem) {
      cartProducts.push({
        product: matchedItem.product,
        size: matchedItem.size,
        quantity: cartItem.quantity,
      });
      subtotal += matchedItem.product.price * cartItem.quantity;
    }
  }

  return (
    <CartContainer
      initialCartProducts={cartProducts}
      initialSubtotal={subtotal}
    />
  );
}
