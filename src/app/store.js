import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/account/accountSlice";
import booksReducer from "../features/book/bookSlice";
import orderHistorysReducer from "../features/orderHistory/orderHistorySlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    books: booksReducer,
    orderHistorys: orderHistorysReducer,
  },
});
