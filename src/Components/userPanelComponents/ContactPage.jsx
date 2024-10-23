import React from "react";
import SubscribeNow from "./SubscribeNow";
import contact_img from "../../assets/frontend_assets/contact_img.png";
import { GoHorizontalRule } from "react-icons/go";

const ContactPage = () => {
  return (
    <>
      <div className="custom-padding mt-8">
        <div className="uppercase text-2xl text-gray-400 font-normal justify-center items-center flex">
          Contact <span className="text-black ml-2">Us</span>
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <div className="mt-12 xs:flex md:gap-12 lg:gap-20 justify-center">
          <img src={contact_img} className="w-[450px]" />
          <div>
            <div className="mt-8">
              <h2 className="text-xl text-gray-700 font-semibold">Our Store</h2>
              <div className="mt-4">
                <p className="text-gray-500">54709 Willms Station</p>
                <p className="text-gray-500">Suite 350, Washington, USA</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-500">Tel: (415) 555-0132</p>
                <p className="text-gray-500">Email: admin@forever.com</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl text-gray-700 font-semibold">
                Careers at Forever
              </h2>
              <p className="mt-4 text-gray-500">
                Learn more about our teams and job openings.
              </p>
              <button className="mt-4 px-4 py-2 border border-black hover:bg-black hover:text-white">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
      <SubscribeNow />
    </>
  );
};

export default ContactPage;
