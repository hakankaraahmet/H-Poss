import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
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

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await fetch(`${baseUrl}/products`);
      const data = await res.json();
      return data.data;
    } catch (error) {
      throw new Error("Failed to fetch Product from the API.");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/add-product`, {
        method: "POST",
        body: JSON.stringify(productData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Unknown error"); // BURADA detayli hata mesaji almak istiyorum
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Unknown error"); // BURADA detayli hata mesaji almak istiyorum
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
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

const productSlice = createSlice({
  name: "products",
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addProduct.pending, (state) => {
        state.addingStatus = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addingStatus = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addingStatus = "failed";
        state.addingError = action.payload || "Unknown error";
      })
      .addCase(editProduct.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.payload || "Unknown error";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message || "Unknown error";
      });
  },
});

export const { resetAddStatus, resetDeleteStatus, resetEditStatus } =
  productSlice.actions;

export default productSlice.reducer;
