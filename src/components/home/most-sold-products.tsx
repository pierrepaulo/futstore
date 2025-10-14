import { Product } from "@/types/product";
import { ProductList } from "../product-list";
import { data } from "@/data";

export const MostSoldProducts = async () => {
  //TODO: fazer requisição dos products
  return (
    <div className="mt-10">
      <h2 className="text-2xl text-center md:text-left">
        Produtos mais vendidos
      </h2>
      <p className="text-gray-500 text-center md:text-left">
        Campeões de vendas da nossa loja.
      </p>
      <div className="mt-9">
        <ProductList list={data.products} />
      </div>
    </div>
  );
};
