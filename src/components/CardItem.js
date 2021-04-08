import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: 280,
    height: "370px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    // backgroundColor: theme.palette.primary.light,
  },
  media: {
    width: "220px",
    height: "130px",
  },

  button: {},
  cardContent: {},
}));

function CardItem({ name, desc, price, img, docId, setCart }) {
  const classes = useStyles();

  const history = useHistory();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    amount: 1,
    price: 0,
    img: "",
    docId: "",
  });

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setCart(product);
  }, [product]);

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          history.push(`/item/${docId}`);
        }}
      >
        <img className={classes.media} src={img} alt="urmum" />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h4">
            {name}
          </Typography>
          <Typography variant="h6" color="primary">
            {desc}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {price + " evru"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={() =>
          setProduct({
            ...product,
            id: docId,
            name: name,
            price: price,
            img: img,
          })
        }
        className={classes.button}
        size="small"
        color="primary"
      >
        <Button variant="contained" color="primary">
          Add to cart
        </Button>
      </Button>
    </Card>
  );
}

export default CardItem;
