"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";

import ButtonCategory from "./ButtonCategory";
import { AppDispatch, RootType } from "@/redux/store";
import {
  StateType,
  getCategories,
  setSelectedFiltering,
} from "@/redux/collectionSlice";

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All" || "");

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootType) => state.collection.categories
  );

  const swiperRef = useRef<SwiperClass | null>(null);

  const handleClickCategory = (item: string) => {
    setSelectedCategory(item);
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (categories.length === 0) {
      dispatch(getCategories());
    }

    dispatch(setSelectedFiltering(selectedCategory));

    return () => {
      abortController.abort();
    };
  }, [dispatch, categories.length, selectedCategory]);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination
        slidesPerView={1}
        breakpoints={{
          330: { slidesPerView: 2 },
          540: { slidesPerView: 4 },
          800: { slidesPerView: 5 },
          1275: { slidesPerView: 7 },
        }}
        className="mt-5 w-full flex px-1  !justify-start !items-center border-disabled rounded-2xl overflow-x-hidden  h-14 border"
      >
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "max-content",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <ButtonCategory
            onClick={() => handleClickCategory("All")}
            activeCategory={selectedCategory}
          >
            All
          </ButtonCategory>
        </SwiperSlide>

        {categories.map((item: string, i: number) => (
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "max-content",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            key={i}
          >
            <ButtonCategory
              onClick={() => handleClickCategory(item)}
              activeCategory={selectedCategory}
            >
              {item}
            </ButtonCategory>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategorySelection;
