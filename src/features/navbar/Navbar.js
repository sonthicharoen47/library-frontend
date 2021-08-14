import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link, Redirect } from "react-router-dom";
import { logOut } from "../account/accountSlice";
//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.account);

  const onLogOut = () => {
    dispatch(logOut());
  };

  // const renderMenu = (
  //   <Menu
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //   >
  //     <MenuItem>Profile</MenuItem>
  //     <MenuItem>My account</MenuItem>
  //   </Menu>
  // );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography>Welcom to my website</Typography>
          {isLogged === false ? (
            <Button href="/login"> Login</Button>
          ) : (
            <Button href="/login" onClick={onLogOut}>
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>

    // <React.Fragment>
    //   <CssBaseline />
    //   <AppBar position="static" color="default" elevation={0}>
    //     <Toolbar>
    //       <Typography variant="h6" color="inherit" noWrap>
    //         Company name
    //       </Typography>
    //       <nav>
    //         <Link variant="button" color="textPrimary" href="#">
    //           Features
    //         </Link>
    //         <Link variant="button" color="textPrimary" href="#">
    //           Enterprise
    //         </Link>
    //         <Link variant="button" color="textPrimary" href="#">
    //           Support
    //         </Link>
    //       </nav>
    //       <Button href="#" color="primary" variant="outlined">
    //         Login
    //       </Button>
    //     </Toolbar>
    //   </AppBar>
    // </React.Fragment>
  );
};

export default Navbar;
