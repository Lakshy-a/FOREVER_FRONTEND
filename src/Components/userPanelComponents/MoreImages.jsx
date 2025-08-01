import React, { useEffect, useState } from "react";

const MoreImages = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const changeClick = (image) => {
    setMainImage(image);
    localStorage.setItem("mainImage", image); // Save the clicked image to localStorage
  };

  useEffect(() => {
    // Update the state whenever `images` prop changes
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col xs:flex-row-reverse gap-2">
      {/* Main Image */}
      <div>
        <img
          src={mainImage}
          alt="Main Display"
          className="w-[500px] xs:w-[620px] xs:h-[550px] object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div
        className={`flex xs:flex-col xs:gap-2 ${
          images.length === 4 ? "justify-between" : "justify-start"
        }`}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 xs:w-[160px] cursor-pointer object-cover"
            onClick={() => changeClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreImages;
