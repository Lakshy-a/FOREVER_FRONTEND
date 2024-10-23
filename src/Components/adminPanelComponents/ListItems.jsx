import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../slices/productsData/productsSlice";

const ListItems = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.products.products);

  const handleRemove = (index) => {
    // Remove product from the list
    dispatch(deleteProduct(index));
  };

  useEffect(() => {
    console.log(allProducts)
  }, [allProducts])

  return (
    <>
      <div className="px-8 xs:pl-16 mt-8 mb-16">
        <div>All Products List</div>
        <div className="border mt-4 flex pl-4 bg-gray-100 border-gray-300  ">
          <div className="w-[130px] font-semibold">Image</div>
          <div className="w-1/2 font-semibold">Name</div>
          <div className="w-[130px] font-semibold">Category</div>
          <div className="w-[130px] font-semibold">Price</div>
          <div className="w-[130px] font-semibold">Action</div>
        </div>
        <div className="mt-4">
          {allProducts.map((product, index) => (
            <div
              className="flex mt-3 border border-gray-400 rounded-md overflow-hidden"
              key={index}
            >
              <div className="w-[130px]">
                <img src={product.image[0]} className="w-12" />
              </div>
              <div className="w-1/2 flex  items-center text-sm font-semibold text-gray-500">
                {product.name}
              </div>
              <div className="w-[130px] flex items-center text-sm font-semibold text-gray-500">
                {product.category}
              </div>
              <div className="w-[130px] text0sm font-semibold text-gray-500 flex items-center">
                ${product.price}
              </div>
              <div
                className="w-[130px] flex items-center justify-center text-sm font-semibold text-gray-500 cursor-pointer"
                onClick={() => handleRemove(product._id)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListItems;
