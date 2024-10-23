import React from "react";
import { GoHorizontalRule } from "react-icons/go";
import ChoosingReasons from "./ChoosingReasons";

const chooseUs = [
  {
    heading: "Quality Assurance:",
    data: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
  },
  {
    heading: "Convenience:",
    data: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
  },
  {
    heading: "Exceptional Customer Service:",
    data: "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <div className="uppercase text-xl text-gray-400 font-semibold flex items-center">
        Why <span className="text-black ml-2">Choose Us</span>
        <span className="text-black ml-2">
          <GoHorizontalRule />
        </span>
      </div>
      <div className="mt-8 xs:flex">
        {chooseUs.map((item, index) => (
          <ChoosingReasons key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
