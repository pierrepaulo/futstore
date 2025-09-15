import { ImageSlider } from "@/components/product/image-slider";
import { ProductDetails } from "@/components/product/prodruct-details";
import { ProductDescription } from "@/components/product/product-description";
import { data } from "@/data";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  //TODO: fazer consulta do produto pelo id

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href={"/"}>Home</Link> &gt; Camisas <Link href={"/"}> </Link> &gt;
        Nome do produto
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-32">
        <ImageSlider images={data.product.images} />
        <ProductDetails product={data.product} />
      </div>
      <ProductDescription text={data.product.description} />

      <div>
        <h3>Você tambem pode gostar:</h3>
        ...
      </div>
    </div>
  );
}
