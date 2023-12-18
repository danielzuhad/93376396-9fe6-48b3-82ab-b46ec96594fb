import Image from "next/image";
import React, { useCallback } from "react";

import { ProductType } from "@/redux/collectionSlice";
import Link from "next/link";
import ButtonDelete from "./ButtonDelete";
import ButtonSave from "./ButtonSave";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = Math.floor(product?.discountPercentage || 0);
  const price = product?.price || 0;

  const discountedPrice = discount ? price - discount : price;

  return (
    <>
      <div className="rounded-lg shadow-md bg-disabled/10 w-[43vw] sm:w-[175px] lg:w-[200px] relative mt-5">
        {/* Image */}

        <ButtonDelete productId={product?.id} />

        <Image
          className="object-cover w-full aspect-square rounded-t-lg"
          src={product?.thumbnail!}
          width={50}
          height={50}
          alt=".."
        />

        {/* Description */}
        <div className="w-full p-2">
          <h3 className="text-md lg:text-lg truncate">{product?.title}</h3>
          <h3 className="text-md lg:text-sm text-disabled truncate">
            {product?.category}
          </h3>
          <p className="text-md lg:text-base font-semibold mt-2 py-1">
            $ {discountedPrice}
          </p>

          {product?.discountPercentage != 0 && (
            <div className="flex w-full gap-2 text-sm">
              <p className="line-through text-black/50">$ {product?.price}</p>

              <p className="text-secondary-high font-semibold">
                {discount} % Off
              </p>
            </div>
          )}

          <div className="w-full mt-3 items-center flex justify-between text-sm">
            <ButtonSave productToAdd={product} />

            <Link
              href={`/edit/${product?.id}`}
              className="bg-secondary-high text-white py-1 px-3 rounded-md flex gap-2 items-center"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
