import React, { useState } from "react";
import { signinAccount } from "./accountSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
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
    </Container>
  );
};

export default LoginForm;
