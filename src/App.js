import React, { useEffect} from "react";
import "./App.css";
import AccountAddForm from "./features/account/AccountAddForm";
import Navbar from "./features/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "./features/account/LoginForm";
import BookList from "./features/book/BookList";
import SingleBookPage from "./features/book/SingleBookPage";
import BookSelected from "./features/book/BookSelected";

function App() {
  const { isLogged } = useSelector((state) => state.accounts);

  useEffect(() => {
    if(isLogged === false) {
      
    }
  },[])

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
          <Route exact path="/book/get/me" component={SingleBookPage} />
          <Route exact path="/book/selected" component={BookSelected} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
