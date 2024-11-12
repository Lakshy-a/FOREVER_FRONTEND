import React from "react";
import { NavLink } from "react-router-dom";
import add_icon from "../../assets/admin_assets/add_icon.png";
import order_icon from "../../assets/admin_assets/order_icon.png";
import { GoPackage } from "react-icons/go";
import { ImUsers } from "react-icons/im";

const AdminPanelSidebar = () => {
  return (
    <div className="border-r w-fit h-screen flex flex-col gap-4 py-8 border-black">
      {/* add items? */}
      <NavLink
        to="/adminPanelHomePage/add"
        className={({ isActive }) =>
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${
            isActive ? "bg-pink-100" : "bg-white"
          }`
        }
      >
        <div>
          <img src={add_icon} className="w-4" alt="add-icon" />
        </div>
        <div className="hidden xs:block">Add Items</div>
      </NavLink>

      {/* list items */}
      <NavLink
        to="/adminPanelHomePage/list"
        className={({ isActive }) =>
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${
            isActive ? "bg-pink-100" : "bg-white"
          }`
        }
      >
        <div>
          <img src={order_icon} className="w-4" alt="list-icon" />
        </div>
        <div className="hidden xs:block">List Items</div>
      </NavLink>

      {/* orders */}
      <NavLink
        to="/adminPanelHomePage/orders"
        className={({ isActive }) =>
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${
            isActive ? "bg-pink-100" : "bg-white"
          }`
        }
      >
        <div className="w-4 text-xl">
          <GoPackage />
        </div>
        <div className="hidden xs:block">Orders</div>
      </NavLink>

      {/* users */}
      <NavLink
        to="/adminPanelHomePage/users"
        className={({ isActive }) =>
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${
            isActive ? "bg-pink-100" : "bg-white"
          }`
        }
      >
        <div className="w-4 text-xl">
          <ImUsers />
        </div>
        <div className="hidden xs:block">All Users</div>
      </NavLink>
    </div>
  );
};

export default AdminPanelSidebar;
