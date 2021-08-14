import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAccount, updateStatus } from "./accountSlice";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
//css
import {
  CssBaseline,
  Button,
  Grid,
  Link,
  Box,
  TextField,
  Avatar,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";

const AccountAddForm = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.account);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (status === "success") {
      setAlert(
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      );

      setTimeout(() => {
        setAlert("");
        dispatch(updateStatus("idle"));
      }, 1000);
    }
  }, [status, dispatch, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fname && lname && email && password && phone) {
      dispatch(signupAccount({ fname, lname, email, password, phone, dob }));
    }

    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob(new Date());
  };

  if (status === "success") {
  }
  console.log(status);

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
    setPhone(e.target.value);
  };
  const onDobChanged = (date) => {
    setDob(date);
  };

  return (
    // <React.Fragment>
    //   <CssBaseline />
    //   <h1>Register Form</h1>
    //   <h3>{message}</h3>
    //   <div>
    //     <label>First Name</label>
    //     <input
    //       type="text"
    //       value={fname}
    //       onChange={(e) => setFname(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Last Name</label>
    //     <input
    //       type="text"
    //       value={lname}
    //       onChange={(e) => setLname(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Password</label>{" "}
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label>Phone Number</label>
    //     <input
    //       type="text"
    //       value={phone}
    //       onChange={(e) => setPhone(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <DatePicker
    //       selected={dob}
    //       onChange={(date) => setDob(date)}
    //       maxDate={new Date()}
    //       showMonthDropdown
    //       showYearDropdown
    //       dropdownMode="select"
    //       placeholderText="enter your birth day"
    //     />
    //   </div>

    //   <button onClick={onSendData}>Confirm</button>
    // </React.Fragment>
    <React.Fragment>
      {alert}
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
                <DatePicker
                  selected={dob}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="enter your birth day"
                  onChange={onDobChanged}
                />
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
                  onChange={onPhoneChanged}
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
