import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./userSlice/userSlice";
import productsReducer from "./productSlice/productSlice";
import categoryReducer from "../components/Category";
const store = configureStore({
  reducer: {
    user: userReduser,
    products: productsReducer,
    category: categoryReducer,
  },
});

export default store;
