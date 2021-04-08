import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import SortNavigation from "../components/SortNavigation";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    height: "80vh",
  },
}));

function Main() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root} maxWidth="lg">
        <SortNavigation />
      </Container>
    </React.Fragment>
  );
}

export default Main;
