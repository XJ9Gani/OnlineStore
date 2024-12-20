import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_PRODUCTS = "http://localhost:3000/products";
const API_INBASKET = "http://localhost:3000/inBasket";

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

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (data) => {
    try {
      const response = await axios.post(API_INBASKET, data);
      return response.data;
    } catch (e) {
      throw Error("Failed to add to cart: " + e.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const categoryName = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.category === categoryName
      );
    },

    filterProducts: (state, action) => {
      const filter = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    },

    resetFilteredProducts: (state) => {
      state.filteredProducts = state.products;
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
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("Product added to cart", action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.error("Failed to add product to cart:", action.error.message);
      });
  },
});

export const {
  filterProductsByCategory,
  filterProducts,
  resetFilteredProducts,
} = productSlice.actions;

export default productSlice.reducer;
