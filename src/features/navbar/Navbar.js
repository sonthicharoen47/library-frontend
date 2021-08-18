import React from "react";
//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  Link,
} from "@material-ui/core";

const Navbar = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Library Online
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/profile"
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Link>
          </nav>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
          <Button href="/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
