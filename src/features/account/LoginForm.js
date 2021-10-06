import React, { useState, useEffect } from "react";
import { signinAccount } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

//css
import {
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Container,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";
//pic
import SvgLogin from "../../picture/undraw_secure_login_pdn4.svg";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[600]),
  backgroundColor: amber[600],
  "&:hover": {
    backgroundColor: amber[700],
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user } = useSelector((state) => state.accounts);

  useEffect(() => {
    if (token !== "" && user !== null) {
      if (user.role === "user") {
        history.push("/dashboard");
      }
      if (user.role === "admin") {
        history.push("/admin/dashboard");
      }
    }
  }, [history, token, user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState({
    helpText: "",
    error: false,
  });
  const [passwordValidate, setPasswordValidate] = useState({
    helpText: "",
    error: false,
  });

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      const body = { email, password };
      dispatch(signinAccount({ body })).then((result) => {
        let text = "";
        let severity = "info";
        if (result.payload.token) {
          text = "login successful!";
          severity = "success";
          dispatch(postSnackbarAlert({ text, severity }));
          if (result.payload.user.role === "user") {
            history.push("/dashboard");
          } else if (result.payload.user.role === "admin") {
            history.push("/admin/dashboard");
          }
        } else {
          text = "email or password wrong!";
          severity = "error";
          setEmailValidate({
            helpText: "email is Require!",
            error: true,
          });
          setPasswordValidate({
            helpText: "password is Require!",
            error: true,
          });
          dispatch(postSnackbarAlert({ text, severity }));
        }
      });
      setEmail("");
      setPassword("");
    } else if (!email && !password) {
      setEmailValidate({
        helpText: "email is Require!",
        error: true,
      });
      setPasswordValidate({
        helpText: "password is Require!",
        error: true,
      });
    } else if (!email) {
      setEmailValidate({
        helpText: "email is Require!",
        error: true,
      });
    } else if (!password) {
      setPasswordValidate({
        helpText: "password is Require!",
        error: true,
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box>
          <Grid container direction="row" sx={{ mt: 6 }}>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
              display="flex"
              direction="column"
            >
              <Box
                sx={{
                  width: "90vh",
                  height: "70vh",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 10,
                  mt: 6,
                }}
                component="img"
                src={SvgLogin}
                alt="login please"
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
              display="flex"
              direction="column"
            >
              <Typography
                variant="h2"
                sx={{
                  fontStyle: "italic",
                  fontFamily: "Monospace",
                  letterSpacing: 2,
                  color: "#673ab7",
                  fontWeight: "medium",
                }}
              >
                Library Online
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50vh",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  overflow: "hidden",
                  borderRadius: "16px",
                  boxShadow: 3,
                  fontWeight: "bold",
                  px: 3,
                  pt: 2,
                  pb: 1,
                  mt: 6,
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#3949ab",
                  }}
                >
                  <AccountCircleRoundedIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, mb: 2 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={onEmailChanged}
                    helperText={emailValidate.helpText}
                    error={emailValidate.error}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onPasswordChanged}
                    helperText={passwordValidate.helpText}
                    error={passwordValidate.error}
                  />
                  <ColorButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </ColorButton>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LoginForm;
