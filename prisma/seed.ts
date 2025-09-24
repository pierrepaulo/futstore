import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.banner.deleteMany();

  await prisma.banner.createMany({
    data: [
      {
        img: "/assets/banners/banner-1.png",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-2.png",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-3.png",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-4.png",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
    ],
  });
}

main().finally(() => prisma.$disconnect());
