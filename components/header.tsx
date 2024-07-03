import React from "react";
import { BorderBeam } from "./magicui/border-beam";
import Image from "next/image";
import logo from "@/app/icon.png";

const Header = () => {
  return (
    <header className="flex gap-2 md:gap-4 items-center">
      <div className="w-8 h-8 md:w-12 md:h-12 relative rounded-xl">
        <BorderBeam duration={5} borderWidth={2} />
        <Image src={logo} alt="logo" className="w-full h-full" />
      </div>
      <p className="text-xl md:text-3xl">Magicons</p>
    </header>
  );
};

export default Header;
