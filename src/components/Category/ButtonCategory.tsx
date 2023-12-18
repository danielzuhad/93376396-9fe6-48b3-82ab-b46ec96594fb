import React, { ComponentProps } from "react";
import cn from "@/utils/cn";

type ButtonCategoryProps = {
  children?: React.ReactNode;
  activeCategory?: string;
  className?: string;
  onClick?: () => void;
};

const ButtonCategory = ({
  children,
  activeCategory,
  className,
  onClick,
}: ButtonCategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl text-md w-full h-[70%]  hover:border-2 border-primary-default",
        activeCategory === children &&
          "bg-primary-default text-white hover:border-none",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonCategory;
