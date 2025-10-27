import z from "zod";
import { PRODUCT_SIZES } from "../types/product-size";

export const cartMountSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int(),
        size: z.enum(PRODUCT_SIZES),
      })
    )
    .nonempty(),
});
