import axios from "axios";
import React, { useEffect, useState } from "react";
import star_dull_icon from "../../assets/frontend_assets/star_dull_icon.png";
import star_icon from "../../assets/frontend_assets/star_icon.png";

const DescriptionReviews = ({ id }) => {
  const [description, setDescription] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviewText, setReviewText] = useState([]);
  const [addReview, setAddReview] = useState(false);

  const handleDescriptionClick = () => {
    setDescription(true);
    setReviews(false);
  };

  const handleReviewsClick = () => {
    setReviews(true);
    setDescription(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/productsById/${id}`)
      .then((response) => {
        const reviews = response.data.data.reviews || [];
        setReviewsCount(reviews.length);
        setReviewText(reviews);
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? star_icon : star_dull_icon}
          alt={i <= rating ? "star " : "dull star "}
          className="w-4 h-4 inline-block mx-1"
        />
      );
    }
    return stars;
  };

  const handleAddReview = () => {
    setAddReview(!addReview);
  };

  return (
    <>
      <div className="flex">
        {/* Description */}
        <div
          className={`border border-b-0 border-gray-300 border-r-0 px-4 py-2 cursor-pointer text-sm ${
            description ? "font-bold" : "text-gray-500"
          }`}
          onClick={handleDescriptionClick}
        >
          Description
        </div>

        {/* Reviews */}
        <div
          className={`cursor-pointer border border-b-0 border-gray-300 px-4 py-2 text-sm ${
            reviews ? "font-bold" : "text-gray-500"
          }`}
          onClick={handleReviewsClick}
        >
          Reviews ( {reviewsCount} )
        </div>
      </div>
      <div className={`border border-gray-300 p-4`}>
        <div className={`${description ? "block" : "hidden"}`}>
          <p className="text-sm text-gray-500">
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
          {reviewText.length === 0 ? (
            <p>No Reviews Yet</p>
          ) : (
            reviewText.map((review, index) => (
              <div
                key={index}
                className="mt-4 border border-gray-300 p-4 text-gray-900 font-semibold flex gap-4"
              >
                <div className="p-5 bg-black w-fit rounded-full">{}</div>
                <div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm">{review.review}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className={`${
            addReview && reviews ? "block" : "hidden"
          } mt-4 border border-gray-300 p-4 text-gray-900 flex flex-col gap-1 font-semibold`}
        >
          <div>Rating:</div>
          <label htmlFor="reviewComment">Comment:</label>
          <textarea
            id="reviewComment"
            className="w-full p-2 border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div
          className={`w-full flex justify-end ${reviews ? "block" : "hidden"}`}
        >
          <button
            className="mt-4 px-4 py-2 rounded-full cursor-pointer font-semibold hover:bg-white hover:text-black hover:border border-gray-900  w-fit bg-black text-white"
            onClick={handleAddReview}
          >
            Add Review
          </button>
        </div>
      </div>
    </>
  );
};

export default DescriptionReviews;
