import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        isActive ? "bg-black text-white border-b w-full" : "border-b w-full"
      }
    >
      <div className="uppercase text-base cursor-pointer font-normal border-gray-400 py-2 px-4">
        {item.name}
      </div>
    </NavLink>
  );
};

export default MenuItem;
