import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: "idle",
  error: "",
  addingStatus: "idle",
  addingError: "",
  editStatus: "idle",
  editError: "",
  deleteStatus: "idle",
  deleteError: "",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const res = await fetch(`${baseUrl}/categories`);
      const data = await res.json();
      const finalData = data.data.map((item) => {
        return { ...item, value: item.title };
      });
      return finalData;
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
      if (res.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Unknown error"); 
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(categoryData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Unknown error");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    try {
      const res = await fetch(`${baseUrl}/categories/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return id;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.addingStatus = "idle";
    },
    resetEditStatus: (state) => {
      state.editStatus = "idle";
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
  },
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
      })
      .addCase(editCategory.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.payload || "Unknown error";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message || "Unknown error";
      });
  },
});

export const { resetAddStatus, resetDeleteStatus, resetEditStatus } =
  categorySlice.actions;
export default categorySlice.reducer;
