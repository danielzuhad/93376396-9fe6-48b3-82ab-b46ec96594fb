import { ProductType } from "@/redux/collectionSlice";
import Image from "next/image";
import React from "react";
import ButtonDeleteFavorite from "./ButtonDeleteFavorite";

type FavoriteCardProps = {
  product: ProductType;
};

const FavoriteCard = ({ product }: FavoriteCardProps) => {
  const discount = Math.floor(product?.discountPercentage || 0);
  const price = product?.price || 0;

  const discountedPrice = discount ? price - discount : price;

  return (
    <>
      <div className="bg-disabled/20 rounded-lg h-40 flex items-center p-2">
        <Image
          src={String(product.thumbnail)}
          alt={String(product.title)}
          width={50}
          height={50}
          className="w-40 max-sm:w-[30vw] h-full rounded-lg aspect-square object-cover"
        />

        {/* TItle */}
        <div className="w-44 px-5 ">
          <h3 className="text-lg max-sm:text-sm">{product.title}</h3>
          <p className="text-sm max-sm:text-xs text-black/60">
            {product.category}
          </p>
        </div>

        {/* Price */}
        <div className="w-40 px-5 flex flex-col items-center max-md:hidden">
          <h3 className="text-lg">$ {discountedPrice}</h3>
          {product?.discountPercentage != 0 && (
            <div className="flex  gap-2 text-sm">
              <p className="line-through text-black/50">$ {product?.price}</p>

              <p className="text-secondary-high font-semibold">
                {discount} % Off
              </p>
            </div>
          )}
        </div>

        {/* Delete */}
        <ButtonDeleteFavorite idProduct={product.id} />
      </div>
    </>
  );
};

export default FavoriteCard;
