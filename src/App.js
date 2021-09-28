import React from "react";
import AccountAddForm from "./features/account/AccountAddForm";
import Navbar from "./features/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginForm from "./features/account/LoginForm";
import BookList from "./features/book/BookList";
import SingleBookPage from "./features/book/SingleBookPage";
import BookSelected from "./features/book/BookSelected";
import OrderHistoryList from "./features/orderHistory/OrderHistoryList";
import OrderHistorySelected from "./features/orderHistory/OrderHistorySelected";
import AdminDashboard from "./features/admin/AdminDashboard";
import SnackbarAlert from "./features/snackbarAlert/SnackbarAlert";
import ProtectedRoute from "./protected.rotue";
import PageNotFound from "./PageNotFound";

//base color #B769FB purple
function App() {
  return (
    <Router>
      <SnackbarAlert />
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path={["/", "/login"]} component={LoginForm} />
          <Route exact path="/register" component={AccountAddForm} />
          <ProtectedRoute exact path="/dashboard" component={BookList} />
          <ProtectedRoute
            exact
            path="/dashboard/me"
            component={SingleBookPage}
          />
          <ProtectedRoute
            exact
            path="/dashboard/selected"
            component={BookSelected}
          />
          <ProtectedRoute
            exact
            path="/orderhistory"
            component={OrderHistoryList}
          />
          <ProtectedRoute
            exact
            path="/orderhistory/date"
            component={OrderHistorySelected}
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
