import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAccount } from "./accountSlice";

const AccountAddForm = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.account);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const onSendData = () => {
    dispatch(signupAccount({ fname, lname, email, password, phone }));

    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <div>
      <h1>Register Form</h1>
      <h3>{message}</h3>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button onClick={onSendData}>Confirm</button>
    </div>
  );
};

export default AccountAddForm;
