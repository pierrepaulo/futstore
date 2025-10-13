import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolut-image-url";
import { calculateShippingSchema } from "../schemas/calculate-shipping-scehma";
import { cartFinishSchema } from "../schemas/cart-finish-schema";
import { getAddressById } from "../services/user";
import { createOrder } from "../services/oder";
import { createPaymentLink } from "../services/payment";

export const cartMout: RequestHandler = async (req, res) => {
  const parseResult = cartMountSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Array de ids invalido" });
    return;
  }
  const { ids } = parseResult.data;

  let products = [];
  for (let id of ids) {
    const product = await getProduct(id);
    if (product) {
      products.push({
        id: product.id,
        label: product.label,
        price: product.price,
        image: product.images[0]
          ? getAbsoluteImageUrl(product.images[0])
          : null,
      });
    }
  }

  res.json({ error: null, products });
};

export const calculateShipping: RequestHandler = async (req, res) => {
  const parseResult = calculateShippingSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "CEP invalido" });
    return;
  }

  const { zipcode } = parseResult.data;

  res.json({ error: null, zipcode, cost: 7, days: 3 });
};

export const finish: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }

  const result = cartFinishSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Carrinho inexistente" });
    return;
  }
  const { cart, addressId } = result.data;
  const address = await getAddressById(userId, addressId);
  if (!address) {
    res.status(400).json({ error: "Endereço invalido" });
    return;
  }

  const shippingCost = 7; //TODO: temporario
  const shippingDays = 3; //TODO: temporario

  const orderId = await createOrder({
    userId,
    address,
    shippingCost,
    shippingDays,
    cart,
  });

  if (!orderId) {
    res.status(400).json({ error: "Ocorreu um errro" });
    return;
  }
  const url = await createPaymentLink({
    cart,
    shippingCost,
    orderId,
  });
  if (!url) {
    res.status(400).json({ error: "Ocorreu um errro" });
    return;
  }

  res.json({ error: null, url });
};
