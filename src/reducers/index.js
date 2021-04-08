import userReducer from "./userReducer";
import itemsReducer from "./itemsReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: userReducer,
  items: itemsReducer,
  cart: cartReducer,
});

export default allReducers;
