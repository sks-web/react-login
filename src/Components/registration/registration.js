import styles from "./registration.module.css";

import { useEffect, useState } from "react";
import Input from "../Elements/input";

export default function Registration(props) {
  const [newUser, setNewUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  // Vaidate Form
  const validateFrom = function ({
    fullName,
    userName,
    password,
    confirmPassword,
  }) {
    let err = {};
    if (!fullName) {
      err.fullname = "Name required";
    } else if (fullName.length <= 3) {
      err.fullname = "Name must be greater then 3 letter";
    }

    if (!userName) {
      err.userName = "Email is required.";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userName)) {
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

    if (!confirmPassword) {
      err.confirmPassword = "Confirm Password must required";
    } else if (confirmPassword !== password) {
      err.confirmPassword = "Confirm password does not matched with password";
    }

    if (Object.keys(err).length === 0) {
      setIsFormSubmit(true);
    } else {
      setIsFormSubmit(false);
    }

    return err;
  };

  // Submit button
  const onFormSubmit = function (e) {
    e.preventDefault();
    setErrors(validateFrom(newUser));
  };

  // updating newUser Details state
  const onInputChange = function (e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isFormSubmit) {
      const user = newUser;
      setNewUser({});
      return props.addNewUserDetails(user, "login");
    } else {
      console.log("Form didnt' submit");
    }
  }, [isFormSubmit]);

  return (
    <form onSubmit={onFormSubmit}>
      <h2>New Registration</h2>
      <hr />
      <label>
        <strong>Full Name:</strong>{" "}
        <Input
          type="text"
          id="Rfullname"
          placeholder="Enter Name"
          onChange={onInputChange}
          name="fullName"
          value={newUser.fullname}
        />
        {errors.fullname && <p className={styles.err}>{errors.fullname}</p>}
      </label>
      <label>
        <strong>Email:</strong>{" "}
        <Input
          type="text"
          id="Rusername"
          placeholder="Enter Email"
          onChange={onInputChange}
          name="userName"
          value={newUser.username}
        />
        {errors.userName && <p className={styles.err}>{errors.userName}</p>}
      </label>

      <label>
        <strong>Password:</strong>{" "}
        <Input
          type="password"
          id="Rpassword"
          placeholder="********"
          onChange={onInputChange}
          value={newUser.password}
          name="password"
        />
        {errors.password && <p className={styles.err}>{errors.password}</p>}
      </label>
      <label>
        <strong>Confirm Password:</strong>{" "}
        <Input
          type="password"
          id="Rconfirmpassword"
          placeholder="********"
          onChange={onInputChange}
          value={newUser.confirmPassword}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className={styles.err}>{errors.confirmPassword}</p>
        )}
      </label>
      <div style={{ textAlign: "right" }}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
