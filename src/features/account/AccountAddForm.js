import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupAccount } from "./accountSlice";
import { useHistory } from "react-router-dom";
import { updateAccountStatus } from "./accountSlice";
//css
import {
  CssBaseline,
  Button,
  Grid,
  Link,
  Box,
  Avatar,
  Typography,
  Container,
  TextField,
} from "@mui/material";

import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const regex = /^[0-9\b]+$/;
const dateMax = new Date();

const AccountAddForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fname && lname && email && password && phone) {
      const body = { fname, lname, email, password, phone, dob };
      dispatch(signupAccount({ body })).then((result) => {
        let text = "";
        let severity = "info";
        if (result.payload.message) {
          text = result.payload.message;
          severity = "success";
        }
        if (result.payload.err) {
          text = result.payload.err;
          severity = "error";
        }
        dispatch(postSnackbarAlert({ text, severity }));
        dispatch(updateAccountStatus("idle"));
        history.push("/login");
      });
    }

    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob(new Date());
  };

  const onFameChanged = (e) => {
    setFname(e.target.value);
  };
  const onLnameChanged = (e) => {
    setLname(e.target.value);
  };
  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const onPhoneChanged = (e) => {
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  return (
    <React.Fragment>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fname}
                  onChange={onFameChanged}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lname}
                  onChange={onLnameChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onEmailChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    label="Date of birth"
                    maxDate={dateMax}
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  type="tel"
                  onChange={onPhoneChanged}
                  inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}></Box>
      </Container>
    </React.Fragment>
  );
};

export default AccountAddForm;
