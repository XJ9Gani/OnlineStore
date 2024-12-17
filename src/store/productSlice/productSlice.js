import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_PRODUCTS = "http://localhost:3000/products";
const API_CATEGORIES = "http://localhost:3000/categories";

const initialState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios.get(API_PRODUCTS);
      return response.data;
    } catch (e) {
      throw Error("Failed to fetch products: " + e.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const filter = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    },
    resetFilteredProducts: (state) => {
      state.filteredProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterProducts, resetFilteredProducts } = productSlice.actions;

export default productSlice.reducer;
