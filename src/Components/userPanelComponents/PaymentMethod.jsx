import React from "react";
import { GoHorizontalRule } from "react-icons/go";
import stripe_logo from "../assets/frontend_assets/stripe_logo.png";
import razorpay_logo from "../assets/frontend_assets/razorpay_logo.png";

const PaymentMethod = () => {
  return (
    <>
      <div className="xs:custom-padding mt-16">
        <div className="uppercase text-2xl text-gray-400 font-semibold flex items-center mt-8">
          Payment <span className="text-black ml-2">Method</span>
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="border border-black py-2 px-4 rounded-md flex gap-4">
            <input
              type="radio"
              name="paymentMethod"
              value={"stripe"}
              className=""
              id="stripe"
            />
            <label htmlFor="stripe">
              <img src={stripe_logo} className="w-12" />
            </label>
          </div>
          <div className="border border-black py-2 px-4 rounded-md flex gap-4">
            <input
              type="radio"
              name="paymentMethod"
              value={"razorpay"}
              className=""
              id="razorpay"
            />
            <label htmlFor="razorpay">
              <img src={razorpay_logo} className="w-28" />
            </label>
          </div>
          <div className="border border-black py-2 px-4 rounded-md flex gap-4">
            <input type="radio" id="cod" name="paymentMethod" value={"cod"} />
            <label htmlFor="cod">
              <div className="uppercase text-sm font-semibold text-gray-400">
                Cash On Delivery
              </div>
            </label>
          </div>
          <div className="w-full text-right">
            <button
              className={`mt-4 uppercase bg-black text-white text-sm px-5 py-3 `}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default PaymentMethod;
