import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAccount } from "./accountSlice";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AccountAddForm = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.account);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());

  const onSendData = () => {
    if (fname && lname && email && password && phone) {
      dispatch(signupAccount({ fname, lname, email, password, phone, dob }));
    }

    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob("");
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

      <div>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="enter your birth day"
        />
      </div>

      <button onClick={onSendData}>Confirm</button>
    </div>
  );
};

export default AccountAddForm;
