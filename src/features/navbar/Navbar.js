import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signoutAccount } from "../account/accountSlice";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLogged, token } = useSelector((state) => state.accounts);
  const [logInView, setLogInView] = useState("hidden");

  const handleLogout = () => {
    dispatch(signoutAccount()).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
        dispatch(postSnackbarAlert({ text, severity }));
      }
    });
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  useEffect(() => {
    if (user && isLogged && token) {
      setLogInView("visible");
    } else {
      setLogInView("hidden");
    }
  }, [user, isLogged, token]);

  return (
    <React.Fragment>
      <CssBaseline />
      {user && user.role === "user" ? (
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            bordetrBottom: (theme) => `1px solid ${theme.palette.divider}`,
            visibility: logInView,
          }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h3"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Button onClick={() => history.push("/dashboard")}>
                Library Online
              </Button>
            </Typography>
            <nav>
              <Link to="/dashboard/selected" style={{ textDecoration: "none" }}>
                <Button type="button">BookSelected</Button>
              </Link>
              <Link
                to="/orderhistory"
                style={{ textDecoration: "none", height: "100%" }}
              >
                <Button type="button">history</Button>
              </Link>
            </nav>

            <Button
              href="/login"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            bordetrBottom: (theme) => `1px solid ${theme.palette.divider}`,
            visibility: logInView,
          }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h3"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Button onClick={() => history.push("/admin/dashboard")}>
                Library Online
              </Button>
            </Typography>

            <Button
              href="/login"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => dispatch(signoutAccount())}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </React.Fragment>
  );
};

export default Navbar;
