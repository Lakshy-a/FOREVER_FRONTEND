import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import upload_area from "../../assets/admin_assets/upload_area.png";
import { useDispatch } from "react-redux";
import { addproduct } from "../../slices/productsData/productsSlice";
import axios from "axios";

const AddItems = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm(); // Access reset from useForm
  const sizeArray = ["S", "M", "L", "XL", "XXL"];
  const colorsArray = ["black", "red", "blue", "yellow", "white"];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [productImages, setImages] = useState([]); // Array to store the image files

  // function to handle the selected sizes
  const handleSizeSelected = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // function to handle selected colors
  const handleColorSelected = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((s) => s !== color) : [...prev, color]
    );
  };

  // function to handle images
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Update image array with the new file
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file; // Add or replace the file at the correct index
        return updatedImages;
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews[index] = reader.result; // Update the image preview
        setImagePreviews(updatedPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // function to handle on submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form data fields
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productCategory", data.productCategory);
    formData.append("productSubCategory", data.productSubCategory);
    formData.append("productPrice", data.productPrice);
    formData.append("productDiscountedPrice", data.productDiscountedPrice);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("isBestseller", data.isBestseller || false);
    formData.append("isNewCollection", data.isNewCollection || false);
    formData.append("isFeatured", data.isFeatured || false);

    // Append selected sizes and colors as JSON strings
    formData.append("availableSizes", JSON.stringify(selectedSizes));
    formData.append("availableColors", JSON.stringify(selectedColors));

    // Append each image to formData
    productImages.forEach((image, index) => {
      formData.append("productImages", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/products/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Reset form and state
      reset();
      setSelectedSizes([]);
      setImagePreviews([null, null, null, null]);
      setImages([]);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 px-8 xs:px-20 mt-8"
      >
        {/* image uploader */}
        <div>
          <label className="text-gray-500 font-medium">Upload Images</label>
          <div className="mt-2 flex gap-2 xs:gap-8">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <label htmlFor={`file-input-${index}`}>
                  {imagePreviews[index] ? (
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index}`}
                      className="w-16 xs:w-20 cursor-pointer object-cover"
                    />
                  ) : (
                    <img
                      src={upload_area}
                      alt="Upload placeholder"
                      className="w-16 xs:w-20 cursor-pointer"
                    />
                  )}
                </label>
                <input
                  id={`file-input-${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(index, e)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* productName */}
        <div className="mt-8 flex flex-col">
          <label htmlFor="productName" className="text-gray-500 font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Type here"
            className="xs:w-[415px] px-2 border border-black mt-2 py-1 w-full rounded-md outline-pink-300"
            {...register("productName", { required: true })}
          />
        </div>

        {/* productDescription */}
        <div className="mt-8 flex flex-col">
          <label
            htmlFor="productDescription"
            className="text-gray-500 font-medium"
          >
            Product Description
          </label>
          <textarea
            id="productDescription"
            placeholder="Write content here"
            className="xs:w-[415px] px-2 border border-black mt-2 py-1 w-full outline-pink-300 rounded-md"
            {...register("productDescription", { required: true })}
          />
        </div>

        {/* productCategory and productSubcategory */}
        <div className="flex xs:flex-row flex-col gap-4 mt-6 w-full">
          <div className="mt-4 w-full xs:w-[200px] flex flex-col">
            <label className="text-gray-500 font-medium">
              Product Category
            </label>
            <select
              className="xs:w-[200px] mt-2 px-2 py-1 border border-black rounded-md outline-pink-300"
              {...register("productCategory", { required: true })}
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div className="mt-4 w-full xs:w-[200px] flex flex-col">
            <label className="text-gray-500 font-medium">Sub Category</label>
            <select
              className="xs:w-[200px] mt-2 border border-black px-2 py-1 rounded-md outline-pink-300"
              {...register("productSubCategory", { required: true })}
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>
        </div>

        {/* product price and discounted price */}
        <div className="flex flex-col xs:flex-row gap-4 mt-6">
          <div className="mt-4 flex flex-col">
            <label className="text-gray-500 font-medium" htmlFor="productPrice">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              placeholder="25"
              className="xs:w-[200px] border border-black w-full px-2 py-1 mt-2 rounded-md outline-pink-300"
              {...register("productPrice", { required: true })}
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label
              className="text-gray-500 font-medium"
              htmlFor="discountedPrice"
            >
              Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              placeholder="20"
              className="xs:w-[200px] border border-black w-full px-2 py-1 mt-2 rounded-md outline-pink-300"
              {...register("productDiscountedPrice", { required: true })}
            />
          </div>
        </div>

        {/* availableStock */}
        <div className="flex flex-col mt-8">
          <label className="text-gray-500 font-medium" htmlFor="availableStock">
            Available Stock
          </label>
          <input
            type="number"
            id="availableStock"
            placeholder="20"
            className="xs:w-[200px] border border-black w-full px-2 py-1 mt-2 rounded-md outline-pink-300"
            {...register("stockQuantity")}
          />
        </div>

        {/* Available sizes */}
        <div className="mt-8">
          <label className="text-gray-500 font-medium" htmlFor="availableSizes">
            Available Sizes
          </label>
          <div id="availableSizes" className="flex gap-4 mt-2">
            {sizeArray.map((size) => (
              <div
                key={size}
                className={`${
                  selectedSizes.includes(size) ? "bg-pink-200" : "bg-gray-300"
                } px-2 py-1 cursor-pointer`}
                onClick={() => handleSizeSelected(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* available colors */}
        <div className="mt-8">
          <label className="text-gray-500 font-medium" htmlFor="sizes">
            Available Colors
          </label>
          <div id="sizes" className="flex gap-4 mt-2">
            {colorsArray.map((color) => (
              <div
                key={color}
                className={`${
                  selectedSizes.includes(color) ? `bg-pink-200` : "bg-gray-300"
                } py-1 px-2 cursor-pointer`}
                onClick={() => handleColorSelected(color)}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        {/* add to bestseller and new collection */}
        <div className="flex flex-col xs:flex-row xs:gap-16 mt-6">
          <div className="mt-4">
            <input
              type="checkbox"
              id="bestseller"
              {...register("isBestseller")}
            />
            <label
              className="text-gray-500 font-medium ml-4"
              htmlFor="bestseller"
            >
              Add to Bestseller
            </label>
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              id="newCollection"
              {...register("isNewCollection")}
            />
            <label
              className="text-gray-500 font-medium ml-4"
              htmlFor="newCollection"
            >
              Add to New Collection
            </label>
          </div>
        </div>

        {/* add to featured collection */}
        <div className="mt-4 xs:mt-6">
          <input type="checkbox" id="featured" {...register("isFeatured")} />
          <label className="text-gray-500 font-medium ml-4" htmlFor="featured">
            Add to Featured Collection
          </label>
        </div>

        {/* button  */}
        <div className="mt-6">
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-black text-white px-10 py-2 hover:bg-white hover:text-black hover:border border-black"
          >
            ADD
          </button>
        </div>
      </form>
    </>
  );
};

export default AddItems;
