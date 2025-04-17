import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // ✅ Default value
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // localStorage.setItem("darkMode", state.darkMode); // ✅ 
      // Persist mode
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
