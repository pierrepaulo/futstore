import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await searchParams;

  //todo: pegar infos da categoria

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href={"/"}>Home</Link> &gt; Temporario
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-3xl">
            <strong>99</strong>Produtos
          </div>
          <div>...</div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:max-w-70">Filtro</div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
          <div>...</div>
          <div>...</div>
          <div>...</div>
          <div>...</div>
        </div>
      </div>
    </div>
  );
}
