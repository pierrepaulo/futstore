import z from "zod";
import { PRODUCT_SIZES } from "../types/product-size";

export const cartFinishSchema = z.object({
  addressId: z.number().int(),
  cart: z
    .array(
      z.object({
        productId: z.number().int(),
        size: z.enum(PRODUCT_SIZES),
        quantity: z.number().int().min(1),
      })
    )
    .nonempty(),
});
