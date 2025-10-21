import { getProductWithCategory } from "@/actions/get-product-with-category";
import { ImageSlider } from "@/components/product/image-slider";
import { ProductDescription } from "@/components/product/product-description";
import { ProductDetails } from "@/components/product/product-details";
import { RealatedProduct } from "@/components/product/related-products";
import { RelatedProductsSekeleton } from "@/components/product/related-products-skeleton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;

  const data = await getProductWithCategory(parseInt(id));
  if (!data) {
    redirect("/");
    return;
  }

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href={"/"}>Home</Link> &gt;{" "}
        <Link href={`/categories/${data.category.slug}`}>
          {data.category.name}
        </Link>{" "}
        &gt;
        {data.product.label}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-32">
        <ImageSlider images={data.product.images} />
        <ProductDetails product={data.product} />
      </div>
      <ProductDescription text={data.product.description} />

      <Suspense fallback={<RelatedProductsSekeleton />}>
        <RealatedProduct id={data.product.id} />
      </Suspense>
    </div>
  );
}
