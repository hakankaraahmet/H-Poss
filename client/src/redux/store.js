import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import billSlice from "./billSlice";
export default configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    bills: billSlice,
    cart: cartSlice,
  },
});
