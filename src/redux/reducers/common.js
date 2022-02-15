import Constants from "../../utils/constants";
import * as types from "../actions/types";

export const initialState = {
  language: Constants.DEFAULT_LANGUAGE,
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };

      default:
        return state;
  }
}