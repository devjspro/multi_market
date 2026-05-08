import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

const token = localStorage.getItem("token");

// 🔒 Safe parsing
let user = null;
try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  user = null;
}

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await API.post("/auth/register/login/", data);
  console.log(res.data)
  localStorage.setItem("token", res.data.access);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/register/register/", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,                 // ✅ FIXED
    isAuthenticated: !!token,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;