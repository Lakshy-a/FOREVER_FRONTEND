import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productsData/productsSlice.js";
import searchBarReducer from "../slices/searchBar/searchBarSlice.js";
import cartReducer from "../slices/cartData/cartSlice.js";
import filterReducer from "../slices/filterData/filterSlice";
import isLoggedReducer, { loggedIn } from "../slices/isLoggedIn/loggedInSlice.js";
import darkModeReducer from "../slices/darkMode/darkMode.js";
import { loadState, saveState } from "../utils/localStorage.js";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    products: productReducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
    filter: filterReducer,
    loggedIn: isLoggedReducer,
    dark: darkModeReducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveState({
    loggedIn: store.getState().loggedIn,
    cart: store.getState().cart,
  })
})
