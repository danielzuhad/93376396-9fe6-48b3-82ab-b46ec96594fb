"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { AppDispatch, RootType } from "@/redux/store";
import { addProduct, updateProduct } from "@/redux/collectionSlice";
import Image from "next/image";
import Input from "./Input";

type FormProps = {
  idEdit?: number;
  titleEdit?: string;
  categoryEdit?: string;
  thumbnailEdit?: string;
  priceEdit?: number | null;
  discountEdit?: number;
};

const Form = ({
  idEdit,
  categoryEdit,
  discountEdit,
  priceEdit,
  thumbnailEdit,
  titleEdit,
}: FormProps) => {
  const [title, setTitle] = useState<string>(titleEdit || "");
  const [category, setCategory] = useState<string>(categoryEdit || "");
  const [thumbnail, setThumbnail] = useState<string>(thumbnailEdit || "");
  const [price, setPrice] = useState<number | null>(priceEdit || null);
  const [discount, setDiscount] = useState<number | null>(discountEdit || null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const products = useSelector((state: RootType) => state.collection.products);
  const categories = useSelector(
    (state: RootType) => state.collection.categories
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result: string | ArrayBuffer | null = reader.result;
      if (result) {
        setThumbnail(result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ onDrop });

  const handleCreate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);

      try {
        if (
          title === "" ||
          category === "" ||
          thumbnail === "" ||
          price === 0
        ) {
          toast.error("Tolong isi dengan benar");
        } else if (idEdit) {
          dispatch(
            updateProduct({
              id: idEdit,
              title,
              price,
              discountPercentage: discount || 0,
              category,
              thumbnail,
            })
          );

          setTitle("");
          setPrice(null);
          setDiscount(null);
          setThumbnail("");
          toast.success("Product Edited");
        } else {
          dispatch(
            addProduct({
              id: products.length + 1,
              title,
              price,
              discountPercentage: discount || 0,
              category,
              thumbnail,
            })
          );

          setTitle("");
          setPrice(null);
          setDiscount(null);
          setThumbnail("");
          toast.success("Product Added");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [
      category,
      discount,
      price,
      thumbnail,
      title,
      dispatch,
      products.length,
      idEdit,
    ]
  );

  return (
    <>
      <div className="mt-24 w-full max-w-xl flex items-center flex-col">
        <h2 className="font-semibold">
          {idEdit ? "Edit Your Product" : "Add New Product Here !"}
        </h2>

        <form
          onSubmit={handleCreate}
          className="w-full mt-10 flex flex-col gap-5"
        >
          <>
            <label>Title</label>
            <Input
              variant="default"
              placeHolder="Product Title"
              onChange={(e) => setTitle(e.target.value)}
              loading={loading}
              type="text"
              required
              value={title}
            />
          </>

          {/* Category */}
          <div className="bg-white h-10 flex items-center border rounded-md w-max pr-2 gap-2">
            <label className="h-full border-r flex items-center p-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Your Category</option>
              {categories.map((item, i) => (
                <option key={i} defaultValue={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex gap-2">
            <div className="flex items-center bg-white border rounded-md w-full">
              <label className=" border-r px-2 h-full min-w-fit flex items-center">
                Price $
              </label>

              <Input
                variant="inline"
                placeHolder="USD"
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))}
                loading={loading}
                value={price !== null ? price : ""}
              />
            </div>

            <div className="flex text-sm items-center bg-white border rounded-md w-full">
              <label className=" border-r px-2 h-full min-w-fit flex items-center">
                Discount $
              </label>

              <Input
                variant="inline"
                placeHolder="%"
                type="number"
                onChange={(e) => setDiscount(Number(e.target.value))}
                loading={loading}
                value={discount !== null ? discount : ""}
              />
            </div>
          </div>

          {/* Image upload  */}
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""} ${
              isDragReject ? "reject" : ""
            } w-full flex justify-center items-center h-32 border border-dashed cursor-pointer ${
              loading && "cursor-not-allowed bg-disabled"
            }`}
          >
            <input {...getInputProps()} />
            <p className="px-2 text-center">
              {thumbnail
                ? "Image Ready, Want to change ? just click here again"
                : "Drop an image here, or click to select one"}
            </p>
          </div>

          {thumbnail && (
            <div className="w-full items-center flex flex-col">
              <p>Thumbnail Preview:</p>
              <Image
                width={200}
                height={200}
                src={thumbnail}
                alt="Thumbnail Preview"
              />
            </div>
          )}

          <button
            type="submit"
            className={`px-2 p-4 bg-primary-default text-white rounded-lg hover:bg-primary-high ${
              loading && "bg-disabled"
            }`}
          >
            {idEdit ? "Edit" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
