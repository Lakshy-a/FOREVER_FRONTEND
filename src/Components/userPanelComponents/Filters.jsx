import React from "react";
import {
  addCategory,
  removeCategory,
  addSubCategory,
  removeSubCategory,
} from "../../slices/filterData/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Filters = ({ item }) => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.filter.categories);
  const selectedSubCategories = useSelector(
    (state) => state.filter.subCategories
  );

  const handleCategoryClick = (value) => {
    if (selectedCategories.includes(value)) {
      dispatch(removeCategory(value));
    } else {
      dispatch(addCategory(value));
    }
  };

  const handleSubCategoryClick = (value) => {
    if (selectedSubCategories.includes(value)) {
      dispatch(removeSubCategory(value));
    } else {
      dispatch(addSubCategory(value));
    }
  };

  return (
    <div className="border border-gray-400 pl-6 pr-6 xs:pr-28 py-3 mt-8">
      <h1 className="uppercase text-sm font-semibold">{item.filterName}</h1>
      <ul className="text-sm mt-4 text-gray-600">
        {item.filterValues.map((value, index) => (
          <li key={index} className="mt-3 flex">
            <input
              type="checkbox"
              value={value}
              id={value}
              onChange={() =>
                item.filterName === "categories"
                  ? handleCategoryClick(value)
                  : handleSubCategoryClick(value)
              }
              checked={
                item.filterName === "categories"
                  ? selectedCategories.includes(value)
                  : selectedSubCategories.includes(value)
              }
            />
            <label className="ml-3 font-semilight" htmlFor={value}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
