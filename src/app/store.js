import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/account/accountSlice";
import booksReducer from "../features/book/bookSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    books: booksReducer,
  },
});
