import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";

const inputVariance = cva("", {
  variants: {
    variant: {
      default: "w-full border p-2 rounded-md text-sm",
      inline: "p-2 w-full  rounded-r-lg text-sm focus:border-none",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

type InputProps = {
  type?: "text" | "number";
  placeHolder?: string;
  loading?: boolean;
  value?: string | number | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
} & ComponentProps<"input"> &
  VariantProps<typeof inputVariance>;

const Input = ({
  loading,
  value,
  onChange,
  type,
  className,
  variant,
  placeHolder,
  ...props
}: InputProps) => {
  return (
    <input
      value={value === null ? "" : value}
      onChange={onChange}
      placeholder={placeHolder}
      type={type}
      className={cn(
        inputVariance({ variant, className }),
        loading && "bg-disabled cursor-not-allowed"
      )}
      {...props}
    />
  );
};

export default Input;
