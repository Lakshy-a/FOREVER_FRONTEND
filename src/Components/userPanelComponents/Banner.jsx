import React from "react";
import hero_img from "../../assets/frontend_assets/hero_img.png";
import { GoHorizontalRule } from "react-icons/go";

const Banner = () => {
  return (
    <div className="border border-black pt-16 xs:pt-0 xs:flex xs:items-center xs:mt-4">
      <div className="flex flex-col items-center gap-1 xs:w-1/2 ">
        <div className="w-56">
          <h2 className="uppercase text-sm text-black font-semibold flex justify-end items-center">
            <span className="text-black mr-2">
              <GoHorizontalRule />
            </span>
            Our Bestsellers
          </h2>
        </div>
        <h1 className="text-4xl font-serif font-medium">Latest Arrivals</h1>
        <h2 className="uppercase text-sm text-black font-semibold flex items-center justify-start w-56 mt-1">
          Shop Now
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </h2>
      </div>
      <div className="mt-16 xs:mt-0 xs:w-1/2 ">
        <img src={hero_img} alt="Hero" className="object" />
      </div>
    </div>
  );
};

export default Banner;
