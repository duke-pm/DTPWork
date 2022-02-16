import {combineReducers} from "redux";
/* REDUCER */
import common from "./common";
import auth from "./auth";

export default combineReducers({
  common,
  auth,
});