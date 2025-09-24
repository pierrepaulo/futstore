import { RequestHandler } from "express";
import { getAllBanners } from "../services/banner";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";

export const getBanners: RequestHandler = async (_req, res) => {
  const banners = await getAllBanners();

  const bannersWithAbsoluteUrl = banners.map((b) => ({
    ...b,
    img: getAbsoluteImageUrl(b.img),
  }));

  console.log("[GET /banners] count =", bannersWithAbsoluteUrl.length);

  res.json({ error: null, banners: bannersWithAbsoluteUrl });
};
