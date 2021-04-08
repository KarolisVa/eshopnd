import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ItemList from "./ItemList";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemList: {
    marginTop: theme.spacing(5),
    border: `8px solid ${theme.palette.primary.light}`,
    height: "65vh",
  },
}));

function SortNavigation() {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {user ? (
        <ItemList />
      ) : (
        <Typography variant="h3" color="primary">
          Please register/login
        </Typography>
      )}
    </div>
  );
}

export default SortNavigation;
