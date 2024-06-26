import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  user: null,
  token: "",
  status: "idle",
  loginStatus: "idle",
  error: "",
  loginError: "",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ token }) => {
    try {
      const res = await fetch(`${baseUrl}/tokens`);
      const data = await res.json();
      const currentUser = data.data.find((item) => item.token === token);
      return currentUser;
    } catch (error) {
      throw new Error("Failed to fetch User from the API.");
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.ok) {
        return data.user;
      } else {
        return rejectWithValue(data.message || "Unknown error");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();

      if (res.ok) {
        //TOKENS
        try {
          const response = await fetch(`${baseUrl}/tokens`);
          const tokens = await response.json();
          const isUserValid = tokens.data.some(
            (item) => item.userId === data.user._id
          );
          const exactUser = tokens.data.find(
            (item) => item.userId === data.user._id
          );
          if (isUserValid) {
            if (userData.remember) {
              localStorage.setItem("userToken", exactUser.token);
            } else {
              const logoutRequestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${exactUser.token}`,
                },
              };
              localStorage.setItem("userToken", exactUser.token);
              setTimeout(async () => {
                localStorage.removeItem("userToken");
                message.error("Your login session has expired!!!");
                try {
                  const res = await fetch(
                    `${baseUrl}/auth/logout`,
                    logoutRequestOptions
                  );
                  const data = await res.json();
                  return data;
                } catch (error) {
                  throw new Error("Failed to Logout.");
                }
              }, 3600000);
            }
            return data;
          } else {
            throw new Error("User is not valid");
          }
        } catch (error) {
          throw new Error("Failed to fetch Token from the API.");
        }
        // ---------
      } else {
        return rejectWithValue(data.message || "Unknown error");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.loginStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload || "Unknown error";
      });
  },
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;
