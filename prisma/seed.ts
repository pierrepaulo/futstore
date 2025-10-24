import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const CATEGORY_SLUG = "camisas";
const TEAM_METADATA_ID = "team";

type TeamProductConfig = {
  id: string;
  name: string;
  productLabel: string;
  description: string;
  price: number;
  images: string[];
};

const teamProducts: TeamProductConfig[] = [
  {
    id: "atletico-mg",
    name: "Atletico Mineiro",
    productLabel: "Camisa Atletico Mineiro 2024",
    description:
      "Camisa oficial do Atletico Mineiro 2024 com faixas em preto e branco.",
    price: 249.9,
    images: ["atletico-1.png"],
  },
  {
    id: "botafogo",
    name: "Botafogo",
    productLabel: "Camisa Botafogo 2024",
    description:
      "Camisa listrada do Botafogo 2024 com detalhes em preto e branco.",
    price: 239.9,
    images: ["botafogo-1.png"],
  },
  {
    id: "bragantino",
    name: "Red Bull Bragantino",
    productLabel: "Camisa Red Bull Bragantino 2024",
    description:
      "Camisa do Red Bull Bragantino 2024 com acabamento moderno em branco e vermelho.",
    price: 219.9,
    images: ["bragantino-1.png"],
  },
  {
    id: "cruzeiro",
    name: "Cruzeiro",
    productLabel: "Camisa Cruzeiro 2024",
    description:
      "Camisa azul do Cruzeiro 2024 inspirada na torcida celeste.",
    price: 229.9,
    images: ["cruzeiro-1.png"],
  },
  {
    id: "flamengo",
    name: "Flamengo",
    productLabel: "Camisa Flamengo 2024",
    description:
      "Camisa rubro-negra do Flamengo 2024 com destaque para as listras tradicionais.",
    price: 259.9,
    images: ["flamengo-1.png"],
  },
  {
    id: "gremio",
    name: "Gremio",
    productLabel: "Camisa Gremio 2024",
    description:
      "Camisa tricolor do Gremio 2024 com detalhes em azul, preto e branco.",
    price: 239.9,
    images: ["gremio-1.png"],
  },
  {
    id: "palmeiras",
    name: "Palmeiras",
    productLabel: "Camisa Palmeiras 2024",
    description:
      "Camisa verde do Palmeiras 2024 com grafismos inspirados no Allianz Parque.",
    price: 249.9,
    images: ["palmeiras-1.png"],
  },
  {
    id: "santos",
    name: "Santos",
    productLabel: "Camisa Santos 2024",
    description:
      "Camisa branca do Santos 2024 com gola contrastante e detalhes em dourado.",
    price: 219.9,
    images: ["santos-1.png"],
  },
  {
    id: "vasco",
    name: "Vasco da Gama",
    productLabel: "Camisa Vasco da Gama 2024",
    description:
      "Camisa cruzmaltina do Vasco da Gama 2024 com faixa diagonal em destaque.",
    price: 239.9,
    images: ["vasco-1.png"],
  },
];

async function main() {
  console.log("[seed] Starting database seeding...");

  console.log("[seed] Checking if database has already been seeded...");
  const existingCategory = await prisma.category.findFirst({
    where: {
      slug: CATEGORY_SLUG,
    },
  });

  if (existingCategory) {
    console.log(
      "[seed] Database has already been seeded. Skipping to avoid duplicate records."
    );
    console.log("[seed] Found existing category:", existingCategory.name);
    return;
  }

  console.log("[seed] No existing data found. Proceeding with seeding...");

  console.log("[seed] Creating category...");
  const category = await prisma.category.create({
    data: {
      slug: CATEGORY_SLUG,
      name: "Camisas de Futebol",
    },
  });
  console.log("[seed] Category created:", category.name);

  console.log("[seed] Creating category metadata...");
  const categoryMetadata = await prisma.categoryMetadata.create({
    data: {
      id: TEAM_METADATA_ID,
      name: "Time",
      categoryId: category.id,
    },
  });
  console.log("[seed] Category metadata created:", categoryMetadata.name);

  console.log("[seed] Creating banners...");
  const banners = await Promise.all([
    prisma.banner.create({
      data: {
        img: "banner-1.png",
        link: "/categories/camisas",
      },
    }),
    prisma.banner.create({
      data: {
        img: "banner-2.png",
        link: "/categories/camisas",
      },
    }),
  ]);
  console.log("[seed] Banners created:", banners.length);

  console.log("[seed] Creating metadata values...");
  const metadataValues = await Promise.all(
    teamProducts.map((team) =>
      prisma.metadataValue.create({
        data: {
          id: team.id,
          label: team.name,
          categoryMetadataId: categoryMetadata.id,
        },
      })
    )
  );
  console.log("[seed] Metadata values created:", metadataValues.length);

  console.log("[seed] Creating products, images and metadata relations...");
  let productImageCount = 0;
  const products = [];

  for (const team of teamProducts) {
    const product = await prisma.product.create({
      data: {
        label: team.productLabel,
        price: team.price,
        description: team.description,
        categoryId: category.id,
      },
    });

    products.push(product);

    const images = await Promise.all(
      team.images.map((url) =>
        prisma.productImage.create({
          data: {
            productId: product.id,
            url,
          },
        })
      )
    );
    productImageCount += images.length;

    await prisma.productMetadata.create({
      data: {
        productId: product.id,
        categoryMetadataId: categoryMetadata.id,
        metadataValueId: team.id,
      },
    });
  }

  console.log("[seed] Products created:", products.length);
  console.log("[seed] Product images created:", productImageCount);
  console.log("[seed] Product metadata relations created:", products.length);

  console.log("[seed] Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("[seed] Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
