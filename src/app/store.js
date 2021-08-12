import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import bookReducer from "../features/book/bookSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    book: bookReducer,
  },
});
