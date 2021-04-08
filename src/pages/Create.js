import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import firebase from "../firebase/firebase";
import validateAddItem from "../auth/validateAddItem";
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
    justifyContent: "space-between",
    height: "280px",
  },

  button: {
    margin: theme.spacing(2),
  },

  upload: {
    width: "120px",
    height: "50px",
  },
}));

function Create() {
  const [disabled, setDisabled] = useState(true);
  const [fileName, setFileName] = useState(
    "https://firebasestorage.googleapis.com/v0/b/e-shophomework.appspot.com/o/download.jpg?alt=media&token=14b9daa0-ff84-4276-8278-26cfbca11fa7"
  );

  const isFirstRun = useRef(true);
  useEffect(() => {
    console.log("abc");
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("ehehe");
    setDisabled(false);
  }, [fileName]);

  const handleFile = async (e) => {
    try {
      const file = e.target.files[0];
      const storageRef = firebase.storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      console.log("HELLLO");
      setFileName(await fileRef.getDownloadURL());
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();

  const history = useHistory();

  const addItemToFirebase = async () => {
    const { name, desc, price } = values;

    try {
      firebase.db
        .collection("items")
        .add({ name: name, desc: desc, price: price, img: fileName });
      history.push("/");
    } catch (err) {
      console.log("Authenticate Error", err);
    }
  };

  const initial_state = {
    name: "",
    desc: "",
    price: "",
  };

  const { handleSubmit, values, handleChange, errors } = useFormValidation(
    initial_state,
    validateAddItem,
    addItemToFirebase
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
          error={errors.desc && true}
          label="description"
          type="text"
          value={values.desc}
          name="desc"
          onChange={handleChange}
        />
        {errors.desc && <p className="error-input">{errors.desc}</p>}

        <TextField
          error={errors.price && true}
          label="price"
          type="number"
          value={values.price}
          name="price"
          onChange={handleChange}
        />
        {errors.price && <p className="error-input">{errors.price}</p>}

        <Button variant="contained" component="label">
          Upload image
          <input type="file" onChange={(e) => handleFile(e)} hidden />
        </Button>

        <Button
          onClick={(e) => handleSubmit()}
          variant="contained"
          color="primary"
          disabled={disabled ? true : false}
        >
          Create
        </Button>
      </div>
    </form>
  );
}

export default Create;
