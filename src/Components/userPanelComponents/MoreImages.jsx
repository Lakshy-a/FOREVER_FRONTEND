import React, { useState } from "react";

const MoreImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const changeClick = (image) => {
    setMainImage(image);
  }

  return (
    <>
      <div className="flex flex-col xs:flex-row-reverse gap-2">
        <div>
          <img src={mainImage} className="xs:w-[760px]"  />
        </div>
        <div className={`flex xs:flex-col xs:gap-2 ${images.length == 4 ? "justify-between" : "justify-start"}`}>
          {images.map((image, index) => (
            <img key={index} src={image} className="w-20 xs:w-[180px] cursor-pointer" onClick={() => changeClick(image)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MoreImages;
