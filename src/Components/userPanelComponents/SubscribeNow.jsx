import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, toggleDarkMode } from "../../slices/darkMode/darkMode.js";

const SubscribeNow = () => {
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.dark.darkMode)

  return (
    <div className={`${isDark ? "bg-gray-950" : ""} `}>
      <h2 className={`${isDark ? "text-gray-100" : "text-gray-400"} text-2xl font-semibold text-center`}>
        Subscribe now & get 20% off
      </h2>
      <div className={`${isDark ? "text-gray-100" : "text-gray-400"} mt-3 text-center `}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div className="mt-4 lg:mt-6 justify-center flex">
        <input
          className="py-2 px-4 outline-none border border-black xs:w-96"
          type="text"
          placeholder="Enter your email"
        />
        <button className="uppercase bg-black text-white px-6 py-2 text-xs font-normal">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeNow;
