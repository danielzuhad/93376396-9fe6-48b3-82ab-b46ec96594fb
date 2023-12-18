import React from "react";
import { PiTShirtThin } from "react-icons/pi";
import Links from "./Links";
import Link from "next/link";
import ButtonReset from "./ButtonReset";

const Navbar = () => {
  const links = [
    { href: "/favorites", title: "Favorites" },
    { href: "/create", title: "Create" },
  ];

  return (
    <>
      <section className="w-screen flex justify-center bg-white/50 backdrop-blur-xl fixed z-10">
        <nav className="container max-2xl:px-2 w-full flex items-center justify-between py-5">
          {/* Title */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-semibold text-lg md:text-xl lg:text-2xl"
            >
              Collections
            </Link>

            <PiTShirtThin size={25} />
          </div>

          {/* Links & Store */}
          <div className="flex items-center gap-3 lg:gap-8 relative text-xs md:text-lg">
            <ButtonReset />

            <div className="flex gap-3 lg:gap-8 lg:text-xl">
              {links.map((item, i) => (
                <Links href={item.href} key={i} title={item.title} />
              ))}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
