import React, { SetStateAction } from "react";

type PaginationProps = {
  totalProducts: number;
  productsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  productsPerPage,
  totalProducts,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="w-full flex justify-center items-center py-5 gap-10">
        {pages.map((page, i) => (
          <button
            onClick={() => setCurrentPage(page)}
            className="px-5 py-1 text-xl rounded-md bg-primary-default text-white shadow-md hover:bg-primary-high"
            key={i}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
