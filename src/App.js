import React from "react";
import "./App.css";
import AccountAddForm from "./features/account/AccountAddForm";
import Navbar from "./features/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginForm from "./features/account/LoginForm";
import BookList from "./features/book/BookList";
import SingleBookPage from "./features/book/SingleBookPage";
import BookSelected from "./features/book/BookSelected";
import OrderHistoryList from "./features/orderHistory/OrderHistoryList";
import OrderHistorySelected from "./features/orderHistory/OrderHistorySelected";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <LoginForm />
              </React.Fragment>
            )}
          />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={AccountAddForm} />
          <Route exact path="/dashboard" component={BookList} />
          <Route exact path="/dashboard/me" component={SingleBookPage} />
          <Route exact path="/dashboard/selected" component={BookSelected} />
          <Route exact path="/orderhistory" component={OrderHistoryList} />
          <Route
            exact
            path="/orderhistory/date"
            component={OrderHistorySelected}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
