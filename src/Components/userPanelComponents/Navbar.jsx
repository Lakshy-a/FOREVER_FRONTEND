import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../../assets/frontend_assets/logo.png";
import cart_icon from "../../assets/frontend_assets/cart_icon.png";
import search_icon from "../../assets/frontend_assets/search_icon.png";
import profile_icon from "../../assets/frontend_assets/profile_icon.png";
import menu_icon from "../../assets/frontend_assets/menu_icon.png";
import MenuItem from "./MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSearchBar } from "../../slices/searchBar/searchBarSlice";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  const cartCount = useSelector((state) => state.cart.cartCount);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearchClick = () => {
    navigate("/collection");
    dispatch(openSearchBar());
  };

  const handleAdminPanel =() => {
    window.open('/adminPanelHomePage',  '_blank');
  }

  const navigate = useNavigate();

  return (
    <nav className="w-full fit py-4 flex justify-between relative z-10 custom-padding border-b border-gray-200">
      <NavLink to="/">
        <div>
          <img src={logo} className="w-36 cursor-pointer" alt="logo" />
        </div>
      </NavLink>
      <div className="hidden xs:flex items-center gap-6">
        {menuItems.map(({ name, path }) => (
          <NavLink
            to={path}
            key={name}
            className={({ isActive }) =>
              `uppercase text-sm font-semibold cursor-pointer ${
                isActive
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
        <div className="uppercase text-xs border border-black px-3 py-1 rounded-full font-semibold text-gray-700 cursor-pointer" onClick={handleAdminPanel}> 
          Admin Panel
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div onClick={handleSearchClick}>
          <img src={search_icon} className="w-5 cursor-pointer" alt="search" />
        </div>
        <NavLink to={"/login"}>
          <div>
            <img
              src={profile_icon}
              className="w-5 cursor-pointer"
              alt="profile"
            />
          </div>
        </NavLink>
        <NavLink to={"/cart"}>
          <div className="relative">
            <img src={cart_icon} className="w-5 cursor-pointer" alt="cart" />
            <div className="absolute top-3 left-3 bg-black rounded-full px-1 text-xs text-white font-semibold">
              {cartCount}
            </div>
          </div>
        </NavLink>
        <div className="cursor-pointer">
          <img
            src={menu_icon}
            className="xs:hidden w-5 cursor-pointer"
            onClick={handleNavOpen}
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } fixed w-full h-screen bg-white z-10 duration-500`}
      >
        <div
          className="cursor-pointer flex gap-2 items-center"
          onClick={handleNavOpen}
        >
          <span className="text-xl text-gray-500">
            <IoIosArrowBack />
          </span>
          <div className="text-gray-500 text-lg font-semibold">Back</div>
        </div>
        <div className="flex flex-col items-start gap-2 mt-4 ">
          {menuItems.map(( item , index) => (
            <MenuItem item={item} key={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
