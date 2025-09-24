import { getAllBanners } from "@/services/banner";
import { getAbsoluteImageUrl } from "@/utils/get-absolute-image-url";
import { RequestHandler } from "express";

export const getBanners: RequestHandler = async (req, res) => {
  const banners = await getAllBanners();
  const bannersWithAbsoluteUrl = banners.map((banner) => ({
    ...banner,
    img: getAbsoluteImageUrl(banner.img),
  }));
  res.json({ error: null });
};
