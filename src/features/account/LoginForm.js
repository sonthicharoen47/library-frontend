import React, { useState } from "react";
import { signinAccount } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
//css
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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

  const onLogIn = (e) => {
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
    <section>
      <Container maxWidth="sm">
        <h1>Login Form!</h1>
        <form onSubmit={onLogIn}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={onEmailChanged}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={onPasswordChanged}
          />

          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
          >
            Medium
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default LoginForm;
