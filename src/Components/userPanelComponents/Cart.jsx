import React, { useEffect } from "react";
import { GoHorizontalRule } from "react-icons/go";
import CartProducts from "./CartProducts";
import CartTotals from "./CartTotals";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="custom-padding w-full h-fit">
        <div className="uppercase text-2xl text-gray-400 font-semibold flex items-center mt-12">
          Your <span className="text-black ml-2">Cart</span>
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <div className="mt-2">
          {cartItems.length === 0 ? (
            <div className="text-sm">
              <span className="font-bold">{cartCount} items</span> in your cart.
            </div>
          ) : (
            <>
              <div>
                <span className="font-bold">{cartCount} items</span> in your
                cart.
              </div>
              <div>
                <CartProducts />
              </div>
            </>
          )}{" "}
        </div>
        <div className="flex justify-end mt-20">
          <CartTotals placeOrder={true} />
        </div>
      </div>
    </>
  );
};

export default Cart;
