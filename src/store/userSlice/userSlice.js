import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_USER = "http://localhost:3000/users";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const responseGet = await axios.get(API_USER);
      const users = responseGet.data;

      const userExists = users.some(
        (user) =>
          user.username === userData.username ||
          user.email === userData.userEmail
      );

      if (userExists) {
        return rejectWithValue("Username or email already exists.");
      }

      const responsePost = await axios.post(API_USER, userData);
      return responsePost.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_USER);
      const users = response.data;

      const user = users.find(
        (user) =>
          user.userEmail === loginData.userEmail &&
          user.password === loginData.password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password.");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  users: [],
  status: "idle",
  loginStatus: "idle",
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
