import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import firebase from "../firebase/firebase";
import validateLogin from "../auth/validateLogin";
import useFormValidation from "../auth/useFormValidation";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  inputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  button: {
    margin: theme.spacing(2),
  },
}));

const initial_state = {
  name: "",
  password: "",
  email: "",
};

function Register() {
  const classes = useStyles();

  const history = useHistory();

  const authenticateUser = async () => {
    const { name, email, password } = values;
    try {
      await firebase.register(name, email, password);
      history.push("/");
    } catch (err) {
      console.log("Authenticate Error", err);
    }
  };

  const { handleSubmit, values, handleChange, errors } = useFormValidation(
    initial_state,
    validateLogin,
    authenticateUser
  );
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.inputs}>
        <TextField
          error={errors.name && true}
          label="name"
          type="text"
          value={values.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <p className="error-input">{errors.name}</p>}
        <TextField
          error={errors.email && true}
          label="email"
          type="text"
          value={values.email}
          name="email"
          onChange={handleChange}
        />
        {errors.email && <p className="error-input">{errors.email}</p>}
        <TextField
          error={errors.password && true}
          label="Pasword"
          type="password"
          value={values.password}
          name="password"
          onChange={handleChange}
        />
        {errors.password && <p className="error-input">{errors.password}</p>}

        <Button
          onClick={(e) => handleSubmit()}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default Register;
