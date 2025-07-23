import React from "react";
import { useSelector, useDispatch } from "react-redux";
import bin_icon from "../../assets/frontend_assets/bin_icon.png";
import { decrement, increment, removeFromCart } from "../../slices/cartData/cartSlice";
import axios from "axios";

const ProductsInsideCart = ({ item, index }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.cartCount);

  // after removing the product from the cart also update the db
  const handleRemoveProduct = async (data) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/cart/removeProductFromCart`,
        {
          data: { productId: data.productId, productSize: data.productSize },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(removeFromCart(data));
      }
    } catch (error) {
      console.error("Error in removing the product from cart", error);
    }
  };


  // after decreasing the quantity also update the same in db
  const handleDecreaseCount = async (data) => {
    await axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/decreaseProductItemIncart`,
        {
          productId: data.productId,
          productSize: data.productSize
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200)
          dispatch(decrement(data));
      })
      .catch((error) => console.error("Error in increasing the product quantity in cart", error));
  };

  // after increasing the quantity also update the same in db
  const handleIncreaseCount = async (data) => {
    await axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/increaseProductItemIncart`,
        {
          productId: data.productId,
          productSize: data.productSize
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200)
          dispatch(increment(data));
      })
      .catch((error) => console.error("Error in increasing the product quantity in cart", error));
  };

  return (
    <div className="flex justify-between mt-8 border border-gray-300 rounded-xl overflow-hidden px-2 xs:px-8 items-center">
      <div className="flex gap-5 py-1 xs:py-3">
        <div>
          <img src={item.productImage} className="w-20" />
        </div>
        <div className="flex flex-col gap-2 text-sm xs:text-base w-36 xs:w-fit">
          <h1 className="font-semibold">{item.productTitle}</h1>
          <div className="flex gap-4 ">
            <p className="font-semibold">${item.productPrice}</p>
            <p className=" border border-gray-300 px-2">{item.productSize}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <span
          className={`text-sm xs:text-xl border border-black rounded-md px-2 cursor-pointer ${item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => (item.quantity > 1) && handleDecreaseCount(item)}
          id={index}
        >
          -
        </span>
        <span className="text-sm xs:text-lg font-semibold">{item.quantity}</span>
        <span
          className="text-sm xs:text-xl border px-2 rounded-md border-black cursor-pointer"
          onClick={() => handleIncreaseCount(item)}
        >
          +
        </span>
      </div>
      <div>
        <img
          id={index}
          src={bin_icon}
          onClick={() => handleRemoveProduct(item)}
          className="w-4 xs:w-5 ml-4 xs:ml-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductsInsideCart;
