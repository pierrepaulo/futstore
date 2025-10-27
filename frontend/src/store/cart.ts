import { ProductSize } from "@/constants/product-sizes";
import { CartItem } from "@/types/cart-item";
import { create } from "zustand";

type CartState = {
  cart: CartItem[];
  shippingZipcode: string;
  shippingCost: number;
  shippingDays: number;
  selectedAddresId: number | null;
  addItem: (cartItem: CartItem) => void;
  removeItem: (productId: string | number, size: ProductSize) => void;
  updateQuantity: (
    productId: string | number,
    size: ProductSize,
    quantity: number
  ) => void;
  setShippingZipcode: (zipcode: string) => void;
  setShippingCost: (cost: number) => void;
  setShippingDays: (days: number) => void;
  setSelectedAddresId: (id: number | null) => void;
  clearCart: () => void;
  clearShipping: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  shippingZipcode: "",
  shippingCost: 0,
  shippingDays: 0,
  selectedAddresId: null,
  addItem: ({ productId, size, quantity }) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      let newCart: CartItem[];
      if (existingIndex > -1) {
        newCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { productId, size, quantity }];
      }
      return { cart: newCart };
    }),
  removeItem: (productId, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.productId === productId && item.size === size)
      ),
    })),
  updateQuantity: (productId, size, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    })),
  setShippingZipcode: (zipcode) => set({ shippingZipcode: zipcode }),
  setShippingCost: (cost) => set({ shippingCost: cost }),
  setShippingDays: (days) => set({ shippingDays: days }),
  setSelectedAddresId: (id) => set({ selectedAddresId: id }),
  clearCart: () =>
    set({
      cart: [],
      shippingZipcode: "",
      shippingCost: 0,
      shippingDays: 0,
      selectedAddresId: null,
    }),
  clearShipping: () =>
    set({
      shippingZipcode: "",
      shippingCost: 0,
      shippingDays: 0,
      selectedAddresId: null,
    }),
}));
