import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await API.get("/products/?mine=true");
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default productSlice.reducer;