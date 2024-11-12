import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loggedIn, loggedOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;
