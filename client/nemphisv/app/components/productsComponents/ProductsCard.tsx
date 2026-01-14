import React from "react";
import { ProductTypes } from "@/app/types/productsTypes";

type ProductsProps = {
  id: string;
  p: ProductTypes;
};

const ProductsCard = ({ p }: ProductsProps) => {
  return (
    <div className="w-full h-auto bg-white text-2xl text-black p-5 border rounded-md cursor-pointer hover:bg-cyan-300 transition-all">
      <h1>{p.name}</h1>
      <p>{p.description}</p>
      <p>{p.price}</p>
      <img src={p.imgUrl} alt="Imagen de referencia" />
    </div>
  );
};

export default ProductsCard;
