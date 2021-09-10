import React, { useState } from "react";
import { signinAccount, updateAccountStatus } from "./accountSlice";
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
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/core/Alert";
import Slide from "@material-ui/core/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    severity: "",
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
        if (result.payload.token) {
          setAlert({
            open: true,
            text: "login success",
            severity: "success",
          });
          setTimeout(() => {
            updateAccountStatus("idle");
            if (result.payload.user.role === "admin") {
              history.push("/admin/dashboard");
            } else {
              history.push("/dashboard");
            }
          }, 1000);
        } else {
          setAlert({
            open: true,
            text: "email or password was wrong!",
            severity: "error",
          });
          setEmailValidate({
            helpText: "email is Require!",
            error: true,
          });
          setPasswordValidate({
            helpText: "password is Require!",
            error: true,
          });
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

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.text}
        </Alert>
      </Snackbar>
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
