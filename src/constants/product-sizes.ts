export const PRODUCT_SIZES = ["P", "M", "G", "GG"] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];
