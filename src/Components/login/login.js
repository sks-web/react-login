import styles from "./login.module.css";

import { useContext, useEffect, useState } from "react";

import Input from "../Elements/input";
import loginContext from "../context/context";

function Login(props) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userData = useContext(loginContext);
  console.log(userData);

  // Handle Submit
  const onFormSubmit = function (e) {
    e.preventDefault();
    setErrors(validateForm(userDetails));
    /**
     * Doubt one whenever i am submitting the form i am getting one error like
     * the below condition is updating after 2nd time if the state already changed.
     */
    // console.log(errors);
    // console.log(isSubmit);
    // if (isSubmit) {
    //   console.log("Login Successful.");
    // } else {
    //   console.log("Login unSuccesful");
    // }
  };

  // Form Validation
  const validateForm = function ({ username, password }) {
    let err = {};
    if (!username) {
      err.username = "Email is required.";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(username)) {
      err.username = "Enter valid email ID";
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
    console.log(err);
    if (Object.keys(err).length === 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }

    return err;
  };

  // useSubmit use to submit isSubmit is changed form when data is changed.
  useEffect(() => {
    if (isSubmit) {
      const user = userData.filter((usr) => {
        return usr.userName === userDetails.username;
      });
      console.log("%", user);
      if (user) {
        if (user[0].password === userDetails.password) {
          console.log("Logged in");
          setIsSubmit(false);
          props.setAuthantication(true);
          setUserDetails({});
        }
      }
    } else {
      console.log("Form is not submitted");
    }
  }, [isSubmit, userDetails]);

  // Updating state
  const onInputChange = function (e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onFormSubmit} method="POST">
      <label>
        <strong>E mail:</strong>{" "}
        <Input
          type="text"
          id="username"
          placeholder="Enter Email"
          onChange={onInputChange}
          name="username"
          value={userDetails.username}
          className={errors ? styles.errTextBox : ""}
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
