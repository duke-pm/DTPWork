import * as types from "./types";

export const changeLanguage = language => ({
  type: types.CHANGE_LANGUAGE,
  payload: language,
});

export const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: theme,
});