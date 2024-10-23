import React, { useEffect } from "react";
import { GoHorizontalRule } from "react-icons/go";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CartTotals = ({placeOrder}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let subTotal = 0;
  let shippingFee = 10;

  cartItems.forEach((element) => {
    subTotal += element.productPrice*element.productQuantity;
  });

  let total = 0;
  if (subTotal > 0) {
    total = subTotal + shippingFee;
  }

  return (
    <>
      <div className="w-full xs:w-96">
        <div className="uppercase text-2xl text-gray-400 font-semibold flex items-center justify-start mt-8 xs:mt-0">
          Cart <span className="text-black ml-2">Totals</span>
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <div className="flex justify-between w-full border-b border-black">
            <div className="text-sm font-semibold">Sub Total</div>
            <div className="font-semibold">$ {subTotal}</div>
          </div>
          <div className="flex justify-between w-full border-b border-black">
            <div className="text-sm font-semibold">Shipping Fee</div>
            <div className="font-semibold">$ {shippingFee}</div>
          </div>
          <div className="flex justify-between w-full">
            {" "}
            <div className="text-sm font-bold">Total</div>
            <div className="font-bold">$ {total}</div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <NavLink to={"/checkout"}>
            <button className={`mt-4 uppercase bg-black hover:bg-white hover:text-black hover:border-black hover:border text-white text-sm px-5 py-3 ${placeOrder ? "bloack" : "hidden"}`}>
              Proceed To Checkout
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CartTotals;
