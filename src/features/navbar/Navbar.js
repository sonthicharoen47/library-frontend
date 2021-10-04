import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signoutAccount, logout } from "../account/accountSlice";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

//css
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
  Slide,
  Box,
} from "@mui/material";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import { styled } from "@mui/material/styles";
import { deepPurple, purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[600]),
  backgroundColor: deepPurple[600],
  "&:hover": {
    backgroundColor: deepPurple[400],
  },
}));

const HomeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[900]),
  backgroundColor: purple[900],
  "&:hover": {
    backgroundColor: deepPurple[700],
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLogged, token } = useSelector((state) => state.accounts);
  const [logInView, setLogInView] = useState("hidden");
  const trigger = useScrollTrigger();

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(signoutAccount()).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
        dispatch(postSnackbarAlert({ text, severity }));
      }
    });
    localStorage.clear();

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

  if (token) {
    return (
      <React.Fragment>
        <CssBaseline />

        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar
            style={{ padding: 0, margin: 0 }}
            position="sticky"
            color="default"
            elevation={0}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              visibility: logInView,
              minHeight: 56,
              bgcolor: "#4a148c",
            }}
          >
            <Toolbar
              style={{ minHeight: 56 }}
              sx={{ flexWrap: "wrap" }}
              disableGutters={true}
            >
              {/* {user && user.role === "user" ? (
                <HomeButton
                  sx={{ minHeight: 56, px: 2, color: "#ede7f6" }}
                  startIcon={<MenuBookOutlinedIcon />}
                  onClick={() => history.push("/dashboard")}
                >
                  Library Online
                </HomeButton>
              ) : (
                <HomeButton
                  sx={{ minHeight: 56, px: 2, color: "#ede7f6" }}
                  startIcon={<MenuBookOutlinedIcon />}
                  onClick={() => history.push("/admin/dashboard")}
                >
                  Library Online
                </HomeButton>
              )}

              <Box sx={{ flexGrow: 1 }} /> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {user && user.role === "user" ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <HomeButton
                      sx={{ minHeight: 56, px: 2, color: "#ede7f6" }}
                      startIcon={<MenuBookOutlinedIcon />}
                      onClick={() => history.push("/dashboard")}
                    >
                      Library Online
                    </HomeButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                      sx={{
                        display: "flex-end",
                        flexDirection: "flex-end",
                      }}
                    >
                      <Link
                        to="/dashboard/selected"
                        style={{ textDecoration: "none", marginRight: "8px" }}
                      >
                        <ColorButton
                          variant="contained"
                          startIcon={<AddShoppingCartOutlinedIcon />}
                          sx={{ minHeight: 40, bgcolor: "#673ab7" }}
                        >
                          BookSelected
                        </ColorButton>
                      </Link>
                      <Link
                        to="/orderhistory"
                        style={{ textDecoration: "none", marginRight: "8px" }}
                      >
                        <ColorButton
                          variant="contained"
                          startIcon={<HistoryOutlinedIcon />}
                          sx={{ minHeight: 40 }}
                        >
                          history
                        </ColorButton>
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <HomeButton
                      sx={{ minHeight: 56, px: 2, color: "#ede7f6" }}
                      startIcon={<MenuBookOutlinedIcon />}
                      onClick={() => history.push("/admin/dashboard")}
                    >
                      Library Online
                    </HomeButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                      sx={{
                        display: "flex-end",
                        flexDirection: "flex-end",
                      }}
                    >
                      <Link
                        to="/admin/addBook"
                        style={{ textDecoration: "none", marginRight: "8px" }}
                      >
                        <ColorButton
                          variant="contained"
                          startIcon={<AddCircleOutlineOutlinedIcon />}
                          sx={{ minHeight: 40, bgcolor: "#673ab7" }}
                        >
                          Add
                        </ColorButton>
                      </Link>
                    </Box>
                  </Box>
                )}
                <Button
                  sx={{ minHeight: 40, mr: 1 }}
                  variant="contained"
                  onClick={handleLogout}
                  color="error"
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Slide>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default Navbar;
