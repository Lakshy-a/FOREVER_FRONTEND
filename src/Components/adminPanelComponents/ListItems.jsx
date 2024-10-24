import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdRestore } from "react-icons/md";

const ListItems = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/products/allProduct",
        { withCredentials: true }
      );
      const products = response.data.data;

      const sortedProducts = products.sort((a, b) => {
        if (a.isDeleted === b.isDeleted) return 0;
        return a.isDeleted ? 1 : -1;
      });

      setAllProducts(sortedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleRemove = async (product) => {
    try {
      if (product.isDeleted) {
        await axios.post(
          `http://localhost:3001/api/products/restoreProduct/${product._id}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(
          `http://localhost:3001/api/products/deleteProduct/${product._id}`,
          { withCredentials: true }
        );
      }
      fetchProducts(); // Re-fetch products after state change
    } catch (error) {
      console.error("Error handling product removal:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products once on component mount
  }, []);

  return (
    <div className="px-4 xs:pl-16 mt-8 mb-16">
      <div>All Products List</div>
      <div className="border mt-4 flex pl-4 bg-gray-100 border-gray-300">
        <div className="w-[130px] font-semibold">Image</div>
        <div className="w-[260px] font-semibold">Name</div>
        <div className="w-[130px] font-semibold">Category</div>
        <div className="w-[130px] font-semibold">Price</div>
        <div className="w-[130px] font-semibold">Status</div>
        <div className="w-[130px] font-semibold">Action</div>
      </div>
      <div className="mt-4">
        {allProducts.map((product) => (
          <div
            className="flex mt-3 border border-gray-400 rounded-md overflow-hidden"
            key={product._id}
          >
            <div className="w-[130px]">
              <img
                src={product.images[0]}
                alt={product.productName}
                className="w-12"
              />
            </div>
            <div className="w-[260px] flex items-center text-sm font-semibold text-gray-500">
              {product.productName}
            </div>
            <div className="w-[130px] flex items-center text-sm font-semibold text-gray-500">
              {product.productCategory}
            </div>
            <div className="w-[130px] text-sm font-semibold text-gray-500 flex items-center">
              ${product.productDiscountedPrice}
            </div>
            <div
              className={`w-[130px] text-sm font-semibold ${
                product.isDeleted ? "text-red-600" : "text-green-600"
              } flex items-center`}
            >
              {product.isDeleted ? "Draft" : "Active"}
            </div>
            <div
              className={`w-[130px] flex items-center justify-center text-xl font-semibold text-gray-500 cursor-pointer ${
                product.isDeleted ? "text-green-600" : "text-red-600"
              }`}
              onClick={() => handleRemove(product)}
            >
              {product.isDeleted ? <MdRestore /> : <MdDelete />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
