import {combineReducers} from "redux";
/* REDUCER */
import common from "./common";
import master from "./master";
import auth from "./auth";
import approved from "./approved";

export default combineReducers({
  common,
  master,
  auth,
  approved,
});