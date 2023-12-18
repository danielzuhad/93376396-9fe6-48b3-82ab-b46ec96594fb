import { removeFromFavorites } from "@/redux/collectionSlice";
import { AppDispatch } from "@/redux/store";
import React, { useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

const ButtonDeleteFavorite = ({ idProduct }: { idProduct: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteFavorite = useCallback(
    () => dispatch(removeFromFavorites({ id: idProduct })),
    [dispatch, idProduct]
  );

  return (
    <>
      <button onClick={handleDeleteFavorite} className="md:pr-5">
        <AiOutlineDelete size={25} />
      </button>
    </>
  );
};

export default ButtonDeleteFavorite;
