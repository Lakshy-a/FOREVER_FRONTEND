import React, { useEffect, useState } from "react";
import SubscribeNow from "./SubscribeNow";
import SingleProduct from "./SingleProduct";
import Filters from "./Filters";
import { GoHorizontalRule } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  resetFilters,
  setSortingFilter,
} from "../../slices/filterData/filterSlice";
import axios from "axios";
import { setNewProducts } from "../../slices/productsData/productsSlice";
import FadeLoader from "react-spinners/ClipLoader";

const filtersData = [
  {
    filterName: "categories",
    filterValues: ["Men", "Women", "Kids"],
  },
  {
    filterName: "subCategories",
    filterValues: ["Topwear", "Bottomwear", "Winterwear"],
  },
];

const CollectionPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const sortingFilter = useSelector((state) => state.filter.sortFilters);
  const isSearchBarOpen = useSelector(
    (state) => state.searchBar.isSearchBarOpen
  );

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  const handleFilterClick = () => setIsFilterOpen(!isFilterOpen);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    dispatch(setSortingFilter(value));

    const sortedProducts = [...originalProducts];
    if (value === "lowToHigh")
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    else if (value === "highToLow")
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
    setProducts(sortedProducts);
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
    setProducts(originalProducts); // Reset to all products
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/allProduct`
        );
        const activeProducts = response.data.data.filter(
          (product) => !product.isDeleted
        );
        setProducts(activeProducts);
        setOriginalProducts(activeProducts);
        dispatch(setNewProducts(activeProducts));
        setLoading(false);
      } catch (error) {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-8xl flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-2xl text-red-500">
        <FadeLoader height={20} />
      </div>
    );

  return (
    <div className="custom-padding mt-8">
      <div
        className={`${
          isSearchBarOpen ? "block" : "hidden"
        } flex justify-center`}
      >
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="xs:flex gap-16 mt-12">
        <div>
          <div
            className="text-xl font-semibold flex items-center justify-between gap-2 uppercase mt-2"
            onClick={handleFilterClick}
          >
            <h1>Filters</h1>
            <h1 className="cursor-pointer" onClick={handleClearFilters}>
              Clear Filters
            </h1>
            <div className="text-sm text-gray-400 xs:hidden">
              <FaChevronRight />
            </div>
          </div>
          <div className={`${isFilterOpen ? "block" : "hidden"} xs:block`}>
            {filtersData.map((item, index) => (
              <div key={index} className="mt-6">
                <Filters item={item} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mt-8 xs:mt-0 xs:flex justify-between items-center">
            <div className="uppercase text-xl xs:text-2xl text-gray-400 font-semibold flex items-center">
              All <span className="text-black ml-2">Collections</span>
              <span className="text-black ml-2">
                <GoHorizontalRule />
              </span>
            </div>
            <div className="mt-8 xs:mt-0">
              <select
                className="border border-black py-2 px-1 outline-none"
                onChange={handleSortChange}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="lowToHigh">Sort by: Low To High</option>
                <option value="highToLow">Sort by: High To Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <SubscribeNow />
    </div>
  );
};

export default CollectionPage;
