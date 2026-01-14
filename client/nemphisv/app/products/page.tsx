import React from "react";
import { ProductTypes } from "../types/productsTypes";
import { getProducts } from "./lib/products";
import ProductsCard from "../components/productsComponents/ProductsCard";

const page = async () => {
  const products: ProductTypes[] = await getProducts();

  return (
    <div className="w-full h-screen p-8 bg-gray-100 grid grid-cols-3 gap-4 ">
      {products.map((p: ProductTypes) => (
        <ProductsCard id={p.id} key={p.id} p={p} />
      ))}
    </div>
  );
};

export default page;
