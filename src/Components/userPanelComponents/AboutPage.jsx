import React from "react";
import SubscribeNow from "./SubscribeNow";
import WhyChooseUs from "./WhyChooseUs";
import { GoHorizontalRule } from "react-icons/go";
import about_img from "../../assets/frontend_assets/about_img.png";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, toggleDarkMode } from "../../slices/darkMode/darkMode.js";

const AboutPage = () => {
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.dark.darkMode)

  return (
    <div className={` custom-padding`}>
      <div className={` uppercase text-2xl  font-semibold flex items-center justify-center mt-8`}>
        About <span className={` ml-2 `}>Us </span>
        <span className={` ml-2`}>
          <GoHorizontalRule />
        </span>
      </div>
      <div className="mt-12 xs:flex md:gap-12 lg:gap-20 justify-center">
        <img src={about_img} className="w-[450px]" alt="About Us" />
        <div>
          <div className={` mt-8`}>
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with
              a simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from
              the comfort of their homes.
            </p>
            <p className="mt-4">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from
              trusted brands and suppliers.
            </p>
          </div>
          <div className="mt-4">
            <h3 className={` text-xl font-semibold`}>Our Mission</h3>
            <p className={` mt-4`}>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <WhyChooseUs />
      </div>
      <SubscribeNow />
    </div>
  );
};

export default AboutPage;
