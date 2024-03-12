import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
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

export const fetchBills = createAsyncThunk("bills/fetchBills", async () => {
  try {
    const res = await fetch(`${baseUrl}/bills`);
    const data = await res.json();
    const finalData = data.data.map((item) => {
      return { ...item, value: item.title };
    });
    return finalData;
  } catch (error) {
    throw new Error("Failed to fetch Bill from the API.");
  }
});

export const addBill = createAsyncThunk(
  "bills/addBill",
  async (billData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/bills/add-bill`, {
        method: "POST",
        body: JSON.stringify(billData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
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

export const editBill = createAsyncThunk(
  "bills/editBill",
  async ({ id, billData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/bills/${id}`, {
        method: "PUT",
        body: JSON.stringify(billData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
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

export const deleteBill = createAsyncThunk("bills/deleteBill", async (id) => {
  try {
    const res = await fetch(`${baseUrl}/bills/${id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return id;
  } catch (error) {
    throw new Error(error);
  }
});

const billSlice = createSlice({
  name: "bills",
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
      .addCase(fetchBills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addBill.pending, (state) => {
        state.addingStatus = "loading";
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.addingStatus = "succeeded";
        state.bills.push(action.payload);
      })
      .addCase(addBill.rejected, (state, action) => {
        state.addingStatus = "failed";
        state.addingError = action.error.message || "Unknown error";
      })
      .addCase(editBill.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editBill.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill
        );
      })
      .addCase(editBill.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.error.message || "Unknown error";
      })
      .addCase(deleteBill.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.bills = state.bills.filter((bill) => bill._id !== action.payload);
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message || "Unknown error";
      });
  },
});

export const { resetAddStatus, resetDeleteStatus, resetEditStatus } =
  billSlice.actions;
export default billSlice.reducer;
