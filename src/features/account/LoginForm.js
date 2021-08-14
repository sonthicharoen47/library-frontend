import React, { useState } from "react";
import { signinAccount } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
//css
import {
  FormControlLabel,
  Checkbox,
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

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signinAccount({ email, password }));
    setEmail("");
    setPassword("");
  };

  console.log(`isLogged : ${isLogged}`);
  if (isLogged === true) {
    return <Redirect to="/book" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 16,
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
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
