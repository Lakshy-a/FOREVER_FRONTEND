import React, { useEffect, useState } from "react";
import star_dull_icon from "../../assets/frontend_assets/star_dull_icon.png";
import star_icon from "../../assets/frontend_assets/star_icon.png";
import { increment } from "../../slices/cartData/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { ImStarEmpty } from "react-icons/im";
import axios from "axios";

const ProductDescription = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.loggedIn.isLoggedIn);

  // Fallback values for product fields
  const {
    _id = "",
    productName = "Unnamed Product",
    productPrice = 0,
    images = [],
    stockQuantity = 0,
    productDescription = "No description available.",
    availableSizes,
    reviews,
    averageRating,
  } = product;

  const parsedSizes = Array.isArray(availableSizes)
    ? availableSizes
    : JSON.parse(availableSizes || "[]");

  useEffect(() => {
    // console.log("Parsed Sizes", typeof parsedSizes[0]);
    // parsedSizes[0].map((item, index) => console.log(item))
  });

  const handleAddToCart = () => {
    if (!logged) {
      toast.error("You need to log in first!");
      return;
    }

    if (!selectedSize) {
      toast.error("Select a product size!");
      return;
    }

    const productData = {
      productId: _id,
      productTitle: productName,
      productPrice,
      productImage: images[0], // Main image
      productSize: selectedSize,
      productQuantity: 1, // Default quantity
    };

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/addToCart`,
        { productData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => console.log("Add to cart success"))
      .catch((error) => console.error(error));

    dispatch(increment(productData));
    toast.success("Product added to cart!");
  };

  // Handle Size Selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const fullRating = Math.floor(averageRating);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-2 border-b pb-4">
        <h1 className="text-2xl font-semibold mt-4">{productName}</h1>
        <div className="flex gap-2 items-center">
          {/* Full Stars */}
          {Array.from({ length: fullRating }, (_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}

          {/* Half Star */}
          {averageRating % 1 !== 0 && (
            <FaStarHalfAlt className="text-yellow-500" />
          )}

          {/* Empty Stars */}
          {Array.from({ length: 5 - Math.ceil(averageRating) }, (_, index) => (
            <ImStarEmpty key={index} className="text-gray-500" />
          ))}

          {/* Rating Value */}
          <div>({Math.round(averageRating * 2) / 2})</div>
        </div>
        <div className="text-3xl font-semibold mt-4">${productPrice}</div>
        <p className="text-medium font-normal text-gray-500 mt-4">
          {productDescription}
        </p>
        <div>
          <h2 className="font-medium mt-4">Select Size</h2>
          <ul className="flex mt-4 gap-4">
            {parsedSizes.map((size, index) => (
              <li
                key={index}
                onClick={() => handleSizeClick(size)}
                className={`border px-3 py-1 cursor-pointer ${selectedSize === size
                  ? "border-red-500 bg-red-100 text-red-600"
                  : "border-gray-200 bg-slate-200"
                  }`}
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
