"use client";

import React from "react";
import { useSelector } from "react-redux";

import Form from "@/components/Form/Form";
import { RootType } from "@/redux/store";

const Edit = ({ params }: { params: { id: number } }) => {
  const product = useSelector((state: RootType) =>
    state.collection.products.find(
      (product) => product.id === Number(params.id)
    )
  );

  return (
    <>
      <Form
        titleEdit={product?.title}
        categoryEdit={product?.category}
        idEdit={Number(product?.id)}
        priceEdit={product?.price}
        discountEdit={product?.discountPercentage}
        thumbnailEdit={String(product?.thumbnail)}
      />
    </>
  );
};

export default Edit;
