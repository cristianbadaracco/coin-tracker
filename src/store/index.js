import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer, filter: filterReducer },
});

export default store;
