"use client";

import { ProductType, addToFavorites } from "@/redux/collectionSlice";
import { AppDispatch, RootType } from "@/redux/store";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type ButtonSaveProps = {
  productToAdd: ProductType;
};

const ButtonSave = ({ productToAdd }: ButtonSaveProps) => {
  const dispatch: AppDispatch = useDispatch();

  const isAlreadyInFavorites = useSelector((state: RootType) =>
    state.collection.favorites.some((product) => product.id === productToAdd.id)
  );

  const handleAddFavorite = useCallback(() => {
    if (isAlreadyInFavorites === false) {
      dispatch(addToFavorites({ product: productToAdd }));
      toast.success("Produk Berhasil ditambahkan");
    } else {
      toast.success("Produk sudah ada di favorit.");
    }
  }, [dispatch, isAlreadyInFavorites, productToAdd]);

  return (
    <button
      onClick={handleAddFavorite}
      className="py-1 px-3 rounded-md bg-teritary-high text-white"
    >
      {isAlreadyInFavorites ? "Saved" : "Save"}
    </button>
  );
};

export default ButtonSave;
