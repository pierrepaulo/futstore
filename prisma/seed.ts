import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.banner.createMany({
    data: [
      {
        img: "/assets/banners/banner-1.jpg",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-2.jpg",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-3.jpg",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
      {
        img: "/assets/banners/banner-4.jpg",
        link: "/categories/camisas",
        createdAt: new Date(),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
