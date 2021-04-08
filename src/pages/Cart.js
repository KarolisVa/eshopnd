import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart } from "../actions/index";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemList: {
    marginTop: theme.spacing(5),
    // border: `8px solid ${theme.palette.primary.light}`,
    minHeight: "655px",
    height: "65vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowY: "scroll",
  },

  button: {
    marginTop: theme.spacing(1),
    width: "100px",
  },

  card: {
    width: 280,
    height: "370px",
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));

function Cart() {
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  let cart = useSelector((state) => state.cart);
  cart = cart.sort();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    let test2 = parseInt(total);
    let test = cart.map((item) => {
      return item.price * item.amount;
    });

    if (test.length > 0) {
      test2 = test.reduce((a, b) => a + b);
    }

    setTotal(test2);
  }, cart);
  return (
    <React.Fragment>
      {user ? (
        <>
          <CssBaseline />
          <Container className={classes.itemList}>
            {cart.map((item) => {
              if (item.amount !== 0) {
                return (
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={() => {
                        history.push(`/item/${item.id}`);
                      }}
                    >
                      <img className={classes.media} src={item.img} alt="ahahah" />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          Name: {item.name}
                        </Typography>

                        <Typography gutterBottom variant="h5" component="h2">
                          Kiekis: {item.amount}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          ${item.price * item.amount}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (item.amount <= 0) {
                          alert("You can't have -1 items");
                          let filteredCart = cart.map((anotherItem) => {
                            if (anotherItem.id === item.id) {
                              return { ...anotherItem, amount: 0 };
                            }

                            return anotherItem;
                          });
                          dispatch(addToCart([...filteredCart]));
                          return;
                        }
                        let filteredCart = cart.map((anotherItem) => {
                          if (anotherItem.id === item.id) {
                            return { ...anotherItem, amount: anotherItem.amount - 1 };
                          }

                          return anotherItem;
                        });
                        setTotal(total - item.price);
                        dispatch(addToCart([...filteredCart]));
                      }}
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        let filteredCart = cart.map((anotherItem) => {
                          if (anotherItem.id === item.id) {
                            return { ...anotherItem, amount: anotherItem.amount + 1 };
                          }

                          return anotherItem;
                        });
                        setTotal(total + item.price);
                        dispatch(addToCart([...filteredCart]));
                      }}
                    >
                      +
                    </Button>
                  </Card>
                );
              }
            })}
          </Container>
          <Typography variant="h3">Your total cost: ${total}</Typography>
          <Button
            onClick={() => alert("Labanakt")}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            BUY
          </Button>
        </>
      ) : (
        <Typography variant="h3" color="primary">
          Please register/login
        </Typography>
      )}
    </React.Fragment>
  );
}

export default Cart;
