import React, { useState } from "react";
import star_dull_icon from "../../assets/frontend_assets/star_dull_icon.png";
import star_icon from "../../assets/frontend_assets/star_icon.png";
import { increment } from "../../slices/cartData/cartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDescription = ({ neededProduct }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();
  const addedProduct = {
    productId: neededProduct._id,
    productTitle: neededProduct.name,
    productPrice: neededProduct.price,
    productImage: neededProduct.image[0],
    productSize: selectedSize,
    productQuantity: neededProduct.quantity,
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(increment(addedProduct));
      toast.success("Product added to cart");
      // addedProduct[productSize] = selectedSize;
      console.log(addedProduct);
    } else {
      toast.error("Select Product Size!");
    }
  };

  const handleSizeClick = (index) => {
    addedProduct.productSize = neededProduct.sizes[index];
    setSelectedSize(neededProduct.sizes[index]);
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col gap-2 border-b pb-4 ">
        <h1 className="text-2xl font-semibold mt-4">{neededProduct.name}</h1>
        <div className="flex gap-2 items-center">
          <img src={star_icon} className="w-3 h-3" />
          <img src={star_icon} className="w-3 h-3" />
          <img src={star_icon} className="w-3 h-3" />
          <img src={star_icon} className="w-3 h-3" />
          <img src={star_dull_icon} className="w-3 h-3" />
          <div>(122)</div>
        </div>
        <div className="text-3xl font-semibold mt-4">
          ${neededProduct.price}
        </div>
        <p className="text-medium font-normal text-gray-500 mt-4">
          {neededProduct.description}
        </p>
        <div>
          <h2 className="font-medium mt-4">Select Size</h2>
          <ul className="flex mt-4 gap-4">
            {neededProduct.sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => handleSizeClick(index)}
                className={`border ${
                  selectedSize == size ? "border-red-500" : "border-gray-200"
                } border-gray-200 px-3 py-1 cursor-pointer bg-slate-200`}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-8 uppercase bg-black text-white px-6 py-3 w-fit hover:text-black hover:bg-white hover:border border-black"
        >
          Add To Cart
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <h2 className="mt-1">100% Original product.</h2>
        <h2 className="mt-1">Cash on delivery is available on this product.</h2>
        <h2 className="mt-1">Easy return and exchange policy within 7 days.</h2>
      </div>
    </>
  );
};

export default ProductDescription;
