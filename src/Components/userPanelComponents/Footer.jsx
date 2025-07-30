import React from "react";
import logo from "../../assets/frontend_assets/logo.png";
import { NavLink } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, toggleDarkMode } from "../../slices/darkMode/darkMode.js";

const Footer = () => {
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.dark.darkMode)

  return (
    <div className={` px-4 md:px-4 lg:px-28 xs:flex justify-between mt-10 xs:mt-20 mb-6`}>
      <div>
        <div>
          <img src={logo} className="w-36 cursor-pointer" alt="logo" />
        </div>
        <p className={` text-sm mt-3  xs:w-96 xs:text-start`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div>
        <div className={` uppercase text-xl font-semibold mt-10 xs:mt-0`}>Company</div>
        <ul className={` mt-4 text-sm font-normal`}>
          <NavLink to="/"><li className="mt-1 cursor-pointer">Home</li></NavLink>
          <NavLink to="/about"><li className="mt-1 cursor-pointer">About Us</li></NavLink>
          <NavLink to="deliveryPolicy"><li className="mt-1 cursor-pointer">Delivery</li></NavLink>
          <NavLink to="/privacyPolicy"><li className="mt-1 cursor-pointer">Privacy Policy</li></NavLink>
        </ul>
      </div>
      <div>
        <div className={` uppercase text-xl font-semibold mt-10 xs:mt-0`}>Get In Touch</div>
        <ul className={` mt-4 text-sm font-normal`}>
          <li className="mt-1">+1-000-000-0000</li>
          <li className="mt-1 cursor-pointer">forever@gmail.com</li>
          <li className="mt-1 cursor-pointer">Instagram</li>
          <NavLink to="/contact"> <li className="mt-1 cursor-pointer">Contact Us</li></NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
