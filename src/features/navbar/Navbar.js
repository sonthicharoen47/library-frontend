import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import { signoutAccount } from "../account/accountSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.accounts);
  const [logInView, setLogInView] = useState("hidden");

  // useEffect(()=)

  useEffect(() => {
    if (token) {
      setLogInView("visible");
    } else {
      setLogInView("hidden");
    }
  }, [token]);

  // const handleLogOut = () => {
  //   dispatch(signoutAccount());
  //   history.push("/login");
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          visibility: logInView,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Library Online
          </Typography>
          <nav>
            <Link to="/book/selected">BookSelected</Link>
            <Link to="/orderhistory">history</Link>
          </nav>

          <Button
            href="/login"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            // onClick={handleLogOut}
            onClick={() => dispatch(signoutAccount())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
