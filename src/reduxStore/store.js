import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productsData/productsSlice";
import searchBarReducer from "../slices/searchBar/searchBarSlice";
import cartReducer from "../slices/cartData/cartSlice";
import filterReducer from "../slices/filterData/filterSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
    filter: filterReducer
  },
});
