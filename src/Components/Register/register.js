import styles from "./registration.module.css";

import { useEffect, useState } from "react";
import Input from "../Elements/input";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialValue = {
  fullName: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

function Registration(props) {
  const [newUser, setNewUser] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // Validation
  const validateForm = function ({
    fullName,
    userName,
    password,
    confirmPassword,
  }) {
    const err = {};

    if (!fullName) {
      err.fullName = "Name required";
    } else if (fullName.length <= 3) {
      err.fullName = "Name must be greater then 3 letter";
    }

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

    if (!confirmPassword) {
      err.confirmPassword = "Confirm Password must required";
    } else if (confirmPassword !== password) {
      err.confirmPassword = "Confirm password does not matched with password";
    }

    /**
     * Below condition is for updating of the isSubmitting to false if not false then it will automatically submit the form using useEffect once no error found.
     * if true form will submit automatically without pressing submit key (that is worng way)
     * if false form will wait to till submit button is clicked and again isSubmitting is true.
     */
    if (Object.keys(err).length === 0) {
      setIsSubmitting(false);
    }

    return err;
  };

  // Submit button
  const onFormSubmit = function (e) {
    e.preventDefault();
    setErrors(validateForm(newUser));
    setIsSubmitting(true);
  };

  // updating newUser Details state
  const onInputChange = function (e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // checking and validating
  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      /**
       * Checking validation when after submitting you are getting error
       */
      setErrors(validateForm(newUser));
    }
  }, [newUser]);

  /**
   * Below useEffect is to prevent form from submitting if no error and isSubmitting is true then form will submit
   */
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      dispatch({ type: "SAVE", userData: newUser });
      setIsSubmitting(false);
      console.log("Form submitted");
      history.push("/login");
      dispatch({ type: "CHANGE_TAB", val: "/login" });
      setNewUser(initialValue);
      console.log("HI i am in register useffect");
    }
  }, [errors]);

  return (
    <form onSubmit={onFormSubmit} autoComplete="new-off">
      <h2>New Registration</h2>
      <hr />
      <label>
        <strong>Full Name:</strong>{" "}
        <Input
          type="text"
          id="fullname"
          placeholder="Enter Name"
          onChange={onInputChange}
          name="fullName"
          value={newUser.fullName}
        />
        {errors.fullName && <p className={styles.err}>{errors.fullName}</p>}
      </label>
      <label>
        <strong>Email:</strong>{" "}
        <Input
          type="text"
          id="username"
          placeholder="Enter Email"
          onChange={onInputChange}
          name="userName"
          value={newUser.userName}
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
          value={newUser.password}
          name="password"
        />
        {errors.password && <p className={styles.err}>{errors.password}</p>}
      </label>
      <label>
        <strong>Confirm Password:</strong>{" "}
        <Input
          type="password"
          id="confirmpassword"
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

export default Registration;
