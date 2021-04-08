import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import { ButtonGroup, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "3rem",
  },

  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "45px",
    },
    marginLeft: "120px",
  },

  button: {
    width: "100px",
    [theme.breakpoints.down("sm")]: {
      height: "20px",
    },
  },

  logout: {
    width: "190px",
  },

  buttons: {
    [theme.breakpoints.down("sm")]: {
      height: "50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
}));

function Header() {
  const user = useSelector((state) => state.user);
  let history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                history.push("/");
              }}
            >
              <AccessibleForwardIcon className={classes.menuButton} />
            </IconButton>

            <Typography variant="h4" className={classes.title}>
              Keris shop
            </Typography>
            {user ? (
              <ButtonGroup className={classes.buttons} color="inherit">
                <Button
                  className={classes.button}
                  onClick={() => {
                    history.push("/cart");
                  }}
                >
                  Cart
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => {
                    firebase.logout();
                  }}
                >
                  Logout
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup className={classes.buttons} color="inherit">
                <Button
                  className={classes.button}
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </ButtonGroup>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default Header;
