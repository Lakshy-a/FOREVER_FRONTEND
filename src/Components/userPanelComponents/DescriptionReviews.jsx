import axios from "axios";
import React, { useEffect, useState } from "react";
import star_dull_icon from "../../assets/frontend_assets/star_dull_icon.png";
import star_icon from "../../assets/frontend_assets/star_icon.png";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { ImStarEmpty } from "react-icons/im";

const DescriptionReviews = ({ id }) => {
  const [description, setDescription] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviewText, setReviewText] = useState([]);
  const [addReview, setAddReview] = useState(false);
  const [selectedRating, setSelectedRating] = useState();
  const [hoveredRating, setHoveredRating] = useState(0); // New hover state
  const [reviewComment, setReviewComment] = useState(""); // State for the comment

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
      .get(`http://localhost:3001/api/reviews/getReviewsByProduct/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setReviewsCount(response.data.data.length);
        setReviewText(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [addReview]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500 mx-1" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 mx-1" />);
      } else {
        stars.push(<ImStarEmpty key={i} className="text-gray-300 mx-1" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  const handleAddReview = () => {
    if (addReview) {
      const newReview = {
        review: reviewComment,
        rating: selectedRating,
        productId: id,
      };

      axios
        .post("http://localhost:3001/api/reviews/addReview", newReview, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          // Reset states after successful review posting
          setAddReview(false);
          setReviewComment("");
          setSelectedRating(0);
        })
        .catch((error) => console.log(error));
    } else {
      setAddReview(true);
    }
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
                className="mt-4 border border-gray-300 p-4 text-gray-900 font-semibold flex gap-4 justify-start items-center"
              >
                <div className="h-10 w-10 flex justify-center items-center font-bold text-lg  bg-black rounded-full text-white">
                  {review.userId.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center mb-2 gap-2">
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
          <div className="flex gap-2">
            Rating :{" "}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <label
                  key={index}
                  onMouseEnter={() => setHoveredRating(index + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <input
                    type="radio"
                    name="rate"
                    value={index + 1}
                    className="hidden"
                    onChange={() => setSelectedRating(index + 1)}
                  />
                  <FaStar
                    className={`cursor-pointer ${
                      index + 1 <= (hoveredRating || selectedRating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </label>
              ))}
            </div>
          </div>
          <label htmlFor="reviewComment">Comment :</label>
          <textarea
            id="reviewComment"
            className="w-full p-2 border border-gray-300 rounded-md outline-none font-normal"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>
        <div
          className={`w-full flex justify-end ${reviews ? "block" : "hidden"}`}
        >
          <button
            className="mt-4 px-4 py-2 rounded-full cursor-pointer font-semibold hover:bg-white hover:text-black hover:border border-gray-900  w-fit bg-black text-white"
            onClick={handleAddReview}
          >
            {addReview ? "Post Review" : "Write a Review"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DescriptionReviews;
