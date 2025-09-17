"use client";

import { getShippingInfo } from "@/actions/get-shipping-info";
import { getUserAddresses } from "@/actions/get-user-addresses";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { Address } from "@/types/adress";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { AddressModal } from "./address-modal";
import { addUserAddres } from "@/actions/add-user-address";

export const ShippingBoxLogged = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (hydrated && token) {
      startTransition(() => {
        getUserAddresses(token).then(setAddresses);
      });
    }
  }, [token, hydrated]);

  useEffect(() => {
    if (cartStore.selectedAddresId) {
      upadateShippingInfo();
    }
  }, [cartStore.selectedAddresId]);

  const handleSelectAddress = async (e: ChangeEvent<HTMLSelectElement>) => {
    cartStore.clearShipping();
    const id = parseInt(e.target.value);
    if (id) {
      const address = addresses.find((addr) => addr.id === id);
      if (address) {
        cartStore.setShippingZipcode(address.zipcode);
        cartStore.setSelectedAddresId(id);
      }
    }
  };

  const upadateShippingInfo = async () => {
    if (cartStore.shippingZipcode.length > 4) {
      const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
      if (shippingInfo) {
        cartStore.setShippingCost(shippingInfo.cost);
        cartStore.setShippingDays(shippingInfo.days);
      }
    }
  };

  const handleAddAddress = async (address: Address) => {
    if (!token) return;
    const newAddresses = await addUserAddres(token, address);
    if (newAddresses) {
      setAddresses(newAddresses);
      setModalOpened(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        onChange={handleSelectAddress}
        value={cartStore.selectedAddresId ?? ""}
        className="flex-1 px-6 py-6 border bg-white border-gray-200 rounded-sm"
      >
        <option value="">
          {addresses.length === 0
            ? "Nenhum endereço cadastrado"
            : "Selecione um endereço"}
        </option>
        {addresses.map((item) => (
          <option key={item.id} value={item.id}>
            {item.street}, {item.number} - {item.city} ({item.zipcode})
          </option>
        ))}
      </select>
      <button
        onClick={() => setModalOpened(true)}
        className="cursor-pointer border-0 rounded-sm "
      >
        Adicionar um novo endereço
      </button>
      <AddressModal
        onAdd={handleAddAddress}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  );
};
