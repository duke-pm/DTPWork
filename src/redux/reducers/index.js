import {combineReducers} from "redux";
/* REDUCER */
import common from "./common";
import auth from "./auth";
import approved from "./approved";

export default combineReducers({
  common,
  auth,
  approved,
});