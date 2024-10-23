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
  const dispatch = useDispatch();
  const [filteredProductList, setFilteredProductList] = useState([]);
  const products = useSelector((state) => state.products.products);
  const selectedCategories = useSelector((state) => state.filter.categories);
  const selectedSubCategories = useSelector(
    (state) => state.filter.subCategories
  );
  const sortingFilter = useSelector((state) => state.filter.sortFilters);
  const isSearchBarOpen = useSelector(
    (state) => state.searchBar.isSearchBarOpen
  );
  const clearFilter = useSelector((state) => state.filter.clearFilter);

  useEffect(() => {
    // Filter products based on categories and subcategories
    let filteredProducts = [...products];

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedSubCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // Apply sorting
    if (sortingFilter === "lowToHigh") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortingFilter === "highToLow") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProductList(filteredProducts);
  }, [selectedCategories, selectedSubCategories, sortingFilter, products]);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleSortChange = (event) => {
    dispatch(setSortingFilter(event.target.value));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="custom-padding mt-8 ">
      <div
        className={`${
          isSearchBarOpen ? "block" : "hidden"
        } flex justify-center cursor-pointer`}
      >
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="xs:flex gap-16 mt-12">
        <div>
          <div
            className="text-xl font-semibold flex items-center justify-between gap-2 uppercase mt-2"
            onClick={handleFilterClick}
          >
            <h1 className="cursor-pointer">Filters</h1>{" "}
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
          <div className="mt-8 xs:mt-0 xs:flex justify-between items-center ">
            <div className="uppercase text-xl xs:text-2xl text-gray-400 font-semibold flex items-center justify-start">
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
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 ">
            {filteredProductList.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <SubscribeNow />
      </div>
    </div>
  );
};

export default CollectionPage;
