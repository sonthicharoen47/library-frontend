import { combineReducers } from "redux";

import accountsReducer from "../features/account/accountSlice";
import booksReducer from "../features/book/bookSlice";
import orderHistorysReducer from "../features/orderHistory/orderHistorySlice";
import adminsReducer from "../features/admin/adminsSlice";
import snackbarAlertsReducer from "../features/snackbarAlert/snackbarAlertsSlice";

const appReducer = combineReducers({
  accounts: accountsReducer,
  books: booksReducer,
  orderHistorys: orderHistorysReducer,
  admins: adminsReducer,
  snackbarAlerts: snackbarAlertsReducer,
});

export default appReducer;
