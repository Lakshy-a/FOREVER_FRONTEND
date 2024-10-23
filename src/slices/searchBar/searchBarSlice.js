import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSearchBarOpen: false,
}

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        openSearchBar: (state) => {
            state.isSearchBarOpen = true
        },
        closeSearchBar: (state) => {
            state.isSearchBarOpen = false
        }
    }
}) 

export const {openSearchBar, closeSearchBar} = searchBarSlice.actions;
export default searchBarSlice.reducer;
