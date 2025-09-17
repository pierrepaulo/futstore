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
        placeholder="digite seu cep"
        className="h-12 flex-1 px-6  border bg-white border-gray-200 rounded-sm "
      />
      <button
        className="h-12 mb-4  px-6  bg-blue-600 text-white border-0 rounded-sm "
        onClick={handleUpdateShipping}
      >
        Calcular
      </button>
    </div>
  );
};
