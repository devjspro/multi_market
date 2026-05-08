import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import API from "../../services/api";


// FETCH CART
export const fetchCart =
  createAsyncThunk(

    "cart/fetch",

    async () => {

      const res = await API.get(
        "/cart/"
      );

      return res.data;
    }
);


// ADD TO CART
export const addToCart =
  createAsyncThunk(

    "cart/add",

    async (productId, thunkAPI) => {

      await API.post(
        "/cart/",
        {
          product: productId,
          quantity: 1,
        }
      );

      thunkAPI.dispatch(
        fetchCart()
      );
    }
);


// REMOVE ITEM
export const removeFromCart =
  createAsyncThunk(

    "cart/remove",

    async (id, thunkAPI) => {

      await API.delete(
        `/cart/${id}/`
      );

      thunkAPI.dispatch(
        fetchCart()
      );
    }
);


// CLEAR CART
export const clearCart =
  createAsyncThunk(

    "cart/clear",

    async (_, thunkAPI) => {

      await API.delete(
        "/cart/clear/"
      );

      thunkAPI.dispatch(
        fetchCart()
      );
    }
);


// DECREASE QUANTITY
export const decreaseQuantity =
  createAsyncThunk(

    "cart/decrease",

    async (id, thunkAPI) => {

      await API.patch(
        `/cart/${id}/decrease/`
      );

      thunkAPI.dispatch(
        fetchCart()
      );
    }
);


const cartSlice = createSlice({

  name: "cart",

  initialState: {

    items: [],
  },

  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(

      fetchCart.fulfilled,

      (state, action) => {

        state.items =
          action.payload;
      }
    );
  },
});

export default cartSlice.reducer;