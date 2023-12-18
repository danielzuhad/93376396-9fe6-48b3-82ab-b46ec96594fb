"use client";

import { resetProducts } from "@/redux/collectionSlice";
import { AppDispatch } from "@/redux/store";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ButtonReset = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleReset = useCallback(() => {
    dispatch(resetProducts());
    toast.success("Products berhasil di reset");
  }, [dispatch]);

  return (
    <button
      onClick={handleReset}
      className="px-4 py-1 bg-primary-low text-white rounded-md"
    >
      Reset
    </button>
  );
};

export default ButtonReset;
