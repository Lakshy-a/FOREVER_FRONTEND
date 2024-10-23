import React from 'react';
import { NavLink } from "react-router-dom";
import add_icon from "../../assets/admin_assets/add_icon.png";
import order_icon from "../../assets/admin_assets/order_icon.png";

const AdminPanelSidebar = () => {
  return (
    <div className='border-r w-fit h-screen flex flex-col gap-4 py-8 border-black'>
      <NavLink 
        to="/adminPanelHomePage/add" 
        className={({ isActive }) => 
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${isActive ? "bg-pink-100" : "bg-white"}`
        }
      >
        <div><img src={add_icon} className='w-4' alt="add-icon" /></div>
        <div className='hidden xs:block'>Add Items</div>
      </NavLink>

      <NavLink 
        to="/adminPanelHomePage/list" 
        className={({ isActive }) => 
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${isActive ? "bg-pink-100" : "bg-white"}`
        }
      >
        <div><img src={order_icon} className='w-4' alt="list-icon" /></div>
        <div className='hidden xs:block'>List Items</div>
      </NavLink>

      <NavLink 
        to="/adminPanelHomePage/orders" 
        className={({ isActive }) => 
          `px-4 w-fit xs:w-44 flex justify-start cursor-pointer border-b border-t border-l border-black py-2 items-center gap-4 rounded-l-md ${isActive ? "bg-pink-100" : "bg-white"}`
        }
      >
        <div><img src={order_icon} className='w-4' alt="orders-icon" /></div>
        <div className='hidden xs:block'>Orders</div>
      </NavLink>
    </div>
  );
};

export default AdminPanelSidebar;
