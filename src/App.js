import React from "react";
import "./App.css";
import AccountAddForm from "./features/account/AccountAddForm";
import Navbar from "./features/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginForm from "./features/account/LoginForm";
import BookList from "./features/book/BookList";

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
          <Route exact path="/book" component={BookList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
