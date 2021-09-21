import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/account/accountSlice";
import booksReducer from "../features/book/bookSlice";
import orderHistorysReducer from "../features/orderHistory/orderHistorySlice";
import adminsReducer from "../features/admin/adminsSlice";
import snackbarAlertsReducer from "../features/snackbarAlert/snackbarAlertsSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    books: booksReducer,
    orderHistorys: orderHistorysReducer,
    admins: adminsReducer,
    snackbarAlerts: snackbarAlertsReducer,
  },
});
