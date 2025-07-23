import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { loggedOut } from "../../slices/isLoggedIn/loggedInSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { setDarkMode, toggleDarkMode } from "../../slices/darkMode/darkMode.js";
import { clearCart } from "../../slices/cartData/cartSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.loggedIn.isLoggedIn);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUser, setIsUser] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = useSelector((state) => state.cart.cartCount);

  const isDark = useSelector((state) => state.dark.darkMode)

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navigate = useNavigate();

  const handleNavOpen = () => setIsNavOpen(!isNavOpen);

  const handleSearchClick = () => {
    navigate("/collection");
    dispatch(openSearchBar());
  };

  const handleAdminPanel = () => {
    window.open("/adminPanelLogin", "_blank");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      localStorage.removeItem("accessToken");
      dispatch(loggedOut());
      dispatch(clearCart());
      setIsUser("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handledarkMode = () => {
    dispatch(toggleDarkMode())
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/auth/userProfile`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setIsUser(response.data.data);
        } catch (error) {
          console.log("Error fetching user profile:", error);
        }
      } else {
        setIsUser(""); // Clear the user if no access token is found
      }
    };

    fetchUserProfile();
  }, [logged]); // Dependency on 'logged'

  return (
    <nav className="w-full py-4 flex justify-between relative z-10 custom-padding border-b border-gray-200">
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
              `uppercase text-sm font-semibold cursor-pointer ${isActive
                ? "text-black border-b-2 border-black"
                : "text-gray-700"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
        <div
          className="uppercase text-xs border border-black px-3 py-1 rounded-full font-semibold text-gray-700 cursor-pointer"
          onClick={handleAdminPanel}
        >
          Admin Panel
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        {/* dark mode */}
        <div className="text-2xl cursor-pointer" onClick={handledarkMode}>
          {isDark ? <MdLightMode /> :
            <MdOutlineDarkMode />}
        </div>

        <div onClick={handleSearchClick}>
          <img src={search_icon} className="w-5 cursor-pointer" alt="search" />
        </div>
        {/* <NavLink className="relative"> */}
        <div className="relative group">
          <div
            className={`${isUser ? "bg-black" : ""
              } w-6 h-6 xs:w-8 xs:h-8 rounded-full text-white flex justify-center items-center font-semibold text-base`}
          >
            {isUser ? (
              isUser.name[0].toUpperCase()
            ) : (
              <img src={profile_icon} className="w-5" alt="profile" />
            )}
          </div>

          <div className="w-fit h-fit rounded-md border border-black absolute top-8 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 flex flex-col gap-2 text-sm font-semibold overflow-hidden">
            {isUser ? (
              <>
                <NavLink to={"/profile"}>
                  <div className="cursor-pointer hover:bg-black hover:text-white px-4 py-1">
                    Profile
                  </div>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-black py-1 hover:text-white px-4 "
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <div className="cursor-pointer px-4 hover:bg-black hover:text-white py-1">
                    Login
                  </div>
                </NavLink>
                <NavLink to="/signup">
                  <div className="cursor-pointer hover:bg-black py-1 hover:text-white px-4">
                    Signup
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
        {/* </NavLink> */}
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
        className={`${isNavOpen ? "translate-x-0" : "translate-x-full"
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
          {menuItems.map((item, index) => (
            <MenuItem item={item} key={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
