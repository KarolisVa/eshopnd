import { useEffect } from "react";
import "./App.css";
import Header from "./pages/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

import { getItems } from "./actions/index";

import useAuth from "./auth/useAuth.js";
import useGetCollection from "./someCustomHooks/useGetCollection";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import Create from "./pages/Create";
import Cart from "./pages/Cart";
import ItemPage from "./pages/ItemPage";

function App() {
  const dispatch = useDispatch();

  const { collectionData } = useGetCollection(firebase.db.collection("items"));

  useEffect(() => {
    dispatch(getItems(collectionData));
  }, [collectionData, dispatch]);

  useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/create" exact>
            <Create />
          </Route>

          <Route path="/cart" exact>
            <Cart />
          </Route>

          <Route path="/register">
            <Register exact />
          </Route>

          <Route path="/item/:id">
            <ItemPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
