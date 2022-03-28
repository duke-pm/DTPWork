import Constants from "../../utils/constants";
import * as types from "../actions/types";

const initialState = {
  language: Constants.DEFAULT_LANGUAGE,
  theme: Constants.DEFAULT_THEME,
};

function CommonReducers(state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };

    case types.CHANGE_THEME:
      return {
        ...state,
        theme: payload,
      };

      default:
        return state;
  }
};

export default CommonReducers;
