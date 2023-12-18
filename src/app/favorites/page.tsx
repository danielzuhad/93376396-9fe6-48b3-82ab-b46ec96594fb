"use client";

import FavoriteCard from "@/components/Favorites/FavoriteCard";
import { RootType } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const products = useSelector((state: RootType) => state.collection.products);

  const favoriteProducts = useSelector(
    (state: RootType) => state.collection.favorites
  );

  const favoriteProductIds = favoriteProducts.map((product) => product.id);

  const filteredFavoriteProducts = favoriteProductIds.filter((favProductId) =>
    products.some((product) => product.id === favProductId)
  );

  const matchedProducts = products.filter((product) =>
    filteredFavoriteProducts.includes(product.id)
  );

  return (
    <>
      {matchedProducts.length === 0 ? (
        <div className="mt-32">Tidak Ada Favorite</div>
      ) : (
        <div className="mt-32 flex flex-wrap justify-center gap-5">
          {matchedProducts.map((product, i) => (
            <FavoriteCard key={i} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
