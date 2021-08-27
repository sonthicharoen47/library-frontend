import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

const Navbar = () => {
  const { isLogged } = useSelector((state) => state.accounts);
  const [logInView, setLogInView] = useState("hidden");

  useEffect(() => {
    if (isLogged === true) {
      setLogInView("visible");
    } else {
      setLogInView("hidden");
    }
  }, [isLogged]);

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
          </nav>

          <Button href="/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
