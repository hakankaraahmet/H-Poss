import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    filteredCategory: "",
    productSearch : ""
  },
  reducers: {
    addFilteredCategory: (state, action) => {
      state.filteredCategory = action.payload;
    },
    resetFilteredCategory: (state) => {
      state.filteredCategory = "";
    },
    addProductSearch: (state, action) => {
      state.productSearch = action.payload;
    },
  },
});

export const { addFilteredCategory, resetFilteredCategory,addProductSearch } = appSlice.actions;
export default appSlice.reducer;
