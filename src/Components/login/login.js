import styles from "./login.module.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../Elements/input";

const initialValue = {
  userName: "",
  password: "",
};

function Login(props) {
  const [userDetails, setUserDetails] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  // Form Validation
  const validateForm = function ({ userName, password }) {
    let err = {};
    if (!userName) {
      err.userName = "Email is required.";
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

    if (Object.keys(err).length === 0) {
      setIsSubmitting(false);
    }

    return err;
  };

  // Handle Submit
  const onFormSubmit = function (e) {
    e.preventDefault();
    setErrors(validateForm(userDetails));
    setIsSubmitting(true);
  };

  // Updating state
  const onInputChange = function (e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  /**
   * this use Effect is used to check the form on every change inthe userDetails
   */
  useEffect(() => {
    if (Object.keys.length !== 0 && isSubmitting) {
      setErrors(validateForm(userDetails));
    }
  }, [userDetails]);

  /**
   * This useEffect is controlling submit button when if no error found and isSubmitting is true then only form will submit
   */
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("Form is submitted");
      setUserDetails(initialValue);
      setIsSubmitting(false);
      history.push("/dashboard");
      props.updateDashbaord("/dashboard");
      props.setIsAuth(true);
    }
  }, [errors]);

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
        {errors.userName && <p className={styles.err}>{errors.userName}</p>}
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
