import { createSlice } from "@reduxjs/toolkit";

// we are going to use this slice to reload a component based on some changes in other component

const refreshSlice = createSlice({
    name: 'refresh',
    initialState: { count: 0 },
    reducers: {
        triggerRefresh: (state) => {
            state.count += 1;
        }
    }
})

export const { triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;