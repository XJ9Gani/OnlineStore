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

// Fetch products from API
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

// Add product to basket
export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (data) => {
    try {
      const response = await axios.post(API_INBASKET, data); // Send product details to the inBasket API
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
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Handle the response when the product is successfully added to the cart
        console.log("Product added to cart", action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        // Handle errors when adding to cart
        console.error("Failed to add product to cart:", action.error.message);
      });
  },
});

export const { filterProducts, resetFilteredProducts } = productSlice.actions;

export default productSlice.reducer;
