"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "@/redux/collectionSlice";
import ProductCard from "./ProductCard";
import { AppDispatch, RootType } from "@/redux/store";
import Pagination from "./Pagination";

const ProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(10);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootType) => state.collection.products);
  const loading = useSelector(
    (state: RootType) => state.collection.loadingProducts
  );
  const SelectedFiltering = useSelector(
    (state: RootType) => state.collection.selectedFiltering
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (products.length === 0) {
      const fetchData = async () => {
        try {
          await dispatch(getProducts());
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchData();
    }

    return () => {
      abortController.abort();
    };
  }, [dispatch, products]);

  // Sort From Last Index
  const sortedProducts = products.slice().sort((a, b) => b.id - a.id);

  // Pagination
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstPostIndex, lastPostIndex);

  // Filtering
  const filteredProducts =
    SelectedFiltering === "All"
      ? currentProducts
      : sortedProducts.filter(
          (product) => product.category === SelectedFiltering
        );

  return (
    <>
      <div className="w-full mt-5 pb-5 place-items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.length === 0 ? (
          <p>No Products</p>
        ) : (
          filteredProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))
        )}
      </div>

      {SelectedFiltering === "All" && (
        <Pagination
          setCurrentPage={setCurrentPage}
          totalProducts={sortedProducts.length}
          productsPerPage={productsPerPage}
        />
      )}
    </>
  );
};

export default ProductSection;
