import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: "idle",
  error: "",
  addingStatus: "idle",
  addingError: "",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const res = await fetch(`${baseUrl}/categories`);
      const data = await res.json();
      return data.data;
    } catch (error) {
      throw new Error("Failed to fetch Category from the API.");
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/categories/add-category`, {
        method: "POST",
        body: JSON.stringify(categoryData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      console.log("res :>> ", res);
      if (res.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.error.message || "Unknown error"); // BURADA detayli hata mesaji almak istiyorum
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addCategory.pending, (state) => {
        state.addingStatus = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.addingStatus = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.addingStatus = "failed";
        state.addingError = action.payload || "Unknown error";
      });
  },
});

export default categorySlice.reducer;
