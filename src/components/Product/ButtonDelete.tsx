"use client";

import { deleteProduct } from "@/redux/collectionSlice";
import { AppDispatch } from "@/redux/store";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";

const ButtonDelete = ({ productId }: { productId: number | undefined }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteProduct = useCallback(() => {
    if (productId !== undefined) {
      dispatch(deleteProduct({ id: productId }));
      toast.success("Product berhasil dihapuskan");
    }
  }, [dispatch, productId]);

  return (
    <button onClick={handleDeleteProduct} className="absolute right-2 top-2">
      <FiDelete fill="red" size="25px" />
    </button>
  );
};

export default ButtonDelete;
