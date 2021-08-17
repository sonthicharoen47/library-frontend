import React, { useState } from "react";
import { signinAccount } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.account);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helpText, setHelpText] = useState({
    email: "",
    password: "",
  });
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
      dispatch(signinAccount({ email, password }));
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

  if (isLogged === true) {
    return <Redirect to="/book" />;
  }

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
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
