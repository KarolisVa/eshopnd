import React, { useState, useEffect, useRef } from "react";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addToCart } from "../actions/index";

const useStyles = makeStyles((theme) => ({
  itemList: {
    marginTop: theme.spacing(5),
    // border: `8px solid ${theme.palette.primary.light}`,
    minHeight: "800px",
    height: "80vh",
    overflowY: "scroll",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  button: {
    marginTop: theme.spacing(2),
  },
}));

function ItemList() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const items = useSelector((state) => state.items);

  const [products, setProducts] = useState([...cart]);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    dispatch(addToCart(products));
  }, [products]);

  const setCart = (product) => {
    const exist = products.find((x) => x.id === product.id);
    console.log("exist is: ", exist);
    if (exist) {
      console.log("found an existing one");
      setProducts(
        products.map((x) =>
          x.id === product.id ? { ...exist, amount: exist.amount + 1 } : x
        )
      );
    } else {
      console.log("didn't find shit");
      setProducts([...products, product]);
    }
  };
  return (
    <>
      <Container className={classes.itemList} maxWidth="lg">
        {items.map((item, index) => (
          <CardItem
            key={index}
            name={item.name}
            desc={item.desc}
            price={item.price}
            img={item.img}
            docId={item.docId}
            setCart={setCart}
          />
        ))}
      </Container>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("/create");
        }}
      >
        Add more items
      </Button>
    </>
  );
}

export default ItemList;
