import * as types from "./types";
import Services from "services";

/**
 ** Master data module
 */
//** All master data */
export const fErrorMasterData = error => ({
  type: types.ERROR_MASTER_GET_ALL,
  payload: error,
});

export const fSuccessMasterData = data => ({
  type: types.SUCCESS_MASTER_GET_ALL,
  payload: data,
});

export const fFetchMasterData = params => {
  return dispatch => {
    dispatch({type: types.START_MASTER_GET_ALL});

    Services.master.getAll(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessMasterData(res.data));
        } else {
          return dispatch(fErrorMasterData(res.errorMessage));
        }
      })
      .catch(error => {
        return dispatch(fErrorMasterData(error));
      });
  };
};