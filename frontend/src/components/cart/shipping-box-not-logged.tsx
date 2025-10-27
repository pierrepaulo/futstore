import { getShippingInfo } from "@/actions/get-shipping-info";
import { useCartStore } from "@/store/cart";

export const ShippingBoxNotLogged = () => {
  const cartStore = useCartStore((state) => state);

  const handleUpdateShipping = async () => {
    if (cartStore.shippingZipcode.length > 4) {
      const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
      if (shippingInfo) {
        cartStore.setShippingCost(shippingInfo.cost);
        cartStore.setShippingDays(shippingInfo.days);
      }
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={cartStore.shippingZipcode}
        onChange={(e) => cartStore.setShippingZipcode(e.target.value)}
        placeholder="Digite seu CEP"
        className="flex-1 px-5 py-4 bg-white border border-gray-200 rounded-sm"
      />
      <button
        className="cursor-pointer border-0"
        onClick={handleUpdateShipping}
      >
        Calcular
      </button>
    </div>
  );
};
