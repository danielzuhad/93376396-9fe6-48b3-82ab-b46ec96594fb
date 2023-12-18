"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ComponentProps } from "react";

import cn from "@/utils/cn";

type LinksProps = {
  href: string;
  title?: string;
  className?: string;
} & ComponentProps<"link">;

const Links = ({ href, title, className }: LinksProps) => {
  const path = usePathname() || "";

  return (
    <>
      <Link
        className={cn("", path === href && "font-semibold", className)}
        href={href}
      >
        {title}
      </Link>
    </>
  );
};

export default Links;
