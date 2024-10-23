import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
  sortFilters: "relevant",
  clearFilter: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
    addSubCategory: (state, action) => {
      state.subCategories.push(action.payload);
    },
    removeSubCategory: (state, action) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory !== action.payload
      );
    },
    setSortingFilter: (state, action) => {
      state.sortFilters = action.payload;
    },
    // setClearFilter: (state, action) => {
    // },

    resetFilters: (state, action) => {
      state.clearFilter = !state.clearFilter;
      state.categories = [];
      state.subCategories = [];
    },
  },
});

export const {
  addCategory,
  removeCategory,
  resetFilters,
  addSubCategory,
  removeSubCategory,
  setSortingFilter,
  //   setClearFilter
} = filterSlice.actions;
export default filterSlice.reducer;
