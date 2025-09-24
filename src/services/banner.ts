import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const getAllBanners = async () => {
  const banners = await prisma.banner.findMany({
    select: { img: true, link: true },
    orderBy: { id: "asc" },
  });

  return banners;
};
