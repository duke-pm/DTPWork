import {combineReducers} from "redux";
/* REDUCER */
import common from "./common";
import master from "./master";
import auth from "./auth";
import management from "./management";
import approved from "./approved";
import booking from "./booking";
import project from "./project";

export default combineReducers({
  common,
  master,
  auth,
  management,
  approved,
  project,
});