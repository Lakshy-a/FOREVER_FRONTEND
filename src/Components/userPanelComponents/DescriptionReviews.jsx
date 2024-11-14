import React, { useState } from "react";

const DescriptionReviews = () => {
  const [description, setDescription] = useState(true);
  const [reviews, setReviews] = useState(false);

  const handleDescriptionClick = () => {
    setDescription(!description);
    setReviews(!reviews);
  };

  const handleReviewsClick = () => {
    setReviews(!reviews);
    setDescription(!description);
  };

  return (
    <>
      <div className="flex ">
        {/* description */}
        <div
          className={`border border-b-0 border-gray-300 border-r-0 px-4 py-2 cursor-pointer text-sm ${
            description ? "font-bold" : "text-gray-500"
          }`}
          onClick={handleDescriptionClick}
        >
          Description
        </div>

        {/* reviews */}
        <div
          className={`cursor-pointer border border-b-0 border-gray-300 px-4 py-2 text-sm ${
            reviews ? "font-bold" : "text-gray-500"
          }`}
          onClick={handleReviewsClick}
        >
          Reviews ( 122 )
        </div>
      </div>
      <div className={`border border-gray-300 p-4`}>
        <div className={`${description ? "block" : "hidden"}`}>
          <p className=" text-sm text-gray-500">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
        <div
          className={`${reviews ? "block" : "hidden"} text-gray-500 text-sm`}
        >
          No reviews yet
        </div>
      </div>
    </>
  );
};

export default DescriptionReviews;
