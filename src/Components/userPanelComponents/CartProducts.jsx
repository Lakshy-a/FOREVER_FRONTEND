import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "../../slices/cartData/cartSlice";
import ProductsInsideCart from "./ProductsInsideCart";
import axios from "axios";

const CartProducts = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.cartCount);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/cart/getUsersCart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("Get user cart success");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="">
        {cartItems.map((item, index) => (
          <ProductsInsideCart index={index} key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default CartProducts;
