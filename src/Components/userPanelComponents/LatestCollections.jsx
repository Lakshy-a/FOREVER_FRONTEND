import React, { useState, useEffect } from "react";
import { GoHorizontalRule } from "react-icons/go";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import axios from "axios";

const LatestCoection = () => {
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products/allProduct`)
      .then((response) =>
        setLatestCollection(
          response.data.data.filter(
            (filterProduct) =>
              filterProduct.isNewCollection && !filterProduct.isDeleted
          )
        )
      )
      .catch((error) => console.log(error));
  }, []);

  // console.log(sortedProducts);

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <div className="uppercase text-3xl text-gray-400 font-semibold flex items-center justify-center mt-8">
          Latest <span className="text-black ml-2">Collections</span>
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <p className="text-gray-500 mt-2  text-sm xs:text-base text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-5 ">
          {latestCollection.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestCoection;
