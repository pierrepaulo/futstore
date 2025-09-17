"use server";

type ShippingInforesponse = {
  zipcode: string;
  cost: number;
  days: number;
};
export const getShippingInfo = async (zipcode: string) => {
  //fazer requisicao para pegar info do cep

  return {
    zipcode: "12345",
    cost: 7,
    days: 3,
  };
};
