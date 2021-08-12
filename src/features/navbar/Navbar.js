import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link, Redirect } from "react-router-dom";
import { logOut } from "../account/accountSlice";
//css
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
    <div>
      <AppBar>
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
    </div>
  );
};

export default Navbar;
