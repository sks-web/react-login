import styles from "./login.module.css";

import { useContext, useEffect, useState } from "react";

import Input from "../Elements/input";
import loginContext from "../context/context";

const initialValue = {
  userName: "",
  password: "",
};

function Login(props) {
  const [userDetails, setUserDetails] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Validation
  const validateForm = function ({ userName, password }) {
    let err = {};
    if (!userName) {
      err.username = "Email is required.";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userName
      )
    ) {
      err.userName = "Enter valid email ID";
    }

    if (!password) {
      err.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      err.password =
        "password must have atleast 1 lower case 1 uper case 1 number and 1 special char and min 8 char.";
    }

    return err;
  };

  // Handle Submit
  const onFormSubmit = function (e) {
    e.preventDefault();
    setErrors(validateForm(userDetails));
    setIsSubmitting(true);
    if (Object.keys(errors) === 0 && isSubmitting) {
      setUserDetails(initialValue);
      console.log("Form Submitted");
    }
  };

  // Updating state
  const onInputChange = function (e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys.length !== 0 && isSubmitting) {
      setErrors(validateForm(userDetails));
    } else {
      setIsSubmitting(true);
    }
  }, [userDetails]);

  return (
    <form onSubmit={onFormSubmit} method="POST">
      <label>
        <strong>E mail:</strong>{" "}
        <Input
          type="text"
          id="username"
          placeholder="Enter Email"
          onChange={onInputChange}
          name="userName"
          value={userDetails.userName}
        />
        {errors.username && <p className={styles.err}>{errors.username}</p>}
      </label>

      <label>
        <strong>Password:</strong>{" "}
        <Input
          type="password"
          id="password"
          placeholder="********"
          onChange={onInputChange}
          value={userDetails.password}
          name="password"
        />
        {errors.password && <p className={styles.err}>{errors.password}</p>}
      </label>
      <div style={{ textAlign: "right" }}>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
