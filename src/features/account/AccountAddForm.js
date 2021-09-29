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

import SvgRegister from "../../picture/undraw_Waiting__for_you_ldha.svg";

import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[600]),
  backgroundColor: amber[600],
  "&:hover": {
    backgroundColor: amber[700],
  },
}));

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
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container direction="row">
          <Grid item xs={6}>
            <Box
              sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.paper",
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: 3,
                fontWeight: "bold",
                mx: 16,
                px: 3,
              }}
            >
              <Avatar
                sx={{
                  m: 2,
                  width: 50,
                  height: 50,
                  bgcolor: "#3949ab",
                }}
              >
                <VpnKeyOutlinedIcon sx={{ fontSize: 40 }} />
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
                <ColorButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </ColorButton>
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ m: 2 }}>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Box
              sx={{
                width: "80vh",
                height: "90vh",
                justifyContent: "center",
                alignItems: "center",
              }}
              component="img"
              src={SvgRegister}
              alt="login please"
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default AccountAddForm;
