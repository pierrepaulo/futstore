import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolut-image-url";
import { calculateShippingSchema } from "../schemas/calculate-shipping-scehma";

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
