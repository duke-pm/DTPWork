import * as types from "./types";
import * as Actions from "redux/actions";
import Services from "services";
/**
 ** Assets module
 */
//** All assets */
export const fErrorListAssets = error => ({
  type: types.ERROR_LIST_ASSETS,
  payload: error,
});

export const fSuccessListAssets = (type, data) => ({
  type: types.SUCCESS_LIST_ASSETS,
  payload: {type, data},
});

export const fFetchListAssets = (type, params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_ASSETS});

    Services.approved.listAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListAssets(type, res));
        } else {
          return dispatch(fErrorListAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** History asset */
export const fErrorHistoryAsset = error => ({
  type: types.ERROR_HISTORY_ASSET,
  payload: error,
});

export const fSuccessHistoryAsset = (dataAsset, dataHistory) => ({
  type: types.SUCCESS_HISTORY_ASSET,
  payload: {dataAsset, dataHistory},
});

export const fFetchHistoryAsset = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_HISTORY_ASSET});

    Services.approved.historyAsset(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessHistoryAsset(res.data.header, res.data.listTransHistory));
        } else {
          return dispatch(fErrorHistoryAsset(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorHistoryAsset(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Get data Employee */
export const fErrorDataEmployee = error => ({
  type: types.ERROR_DATA_EMPLOYEE,
  payload: error,
});

export const fSuccessDataEmployee = () => ({
  type: types.SUCCESS_DATA_EMPLOYEE,
});

export const fFetchDataEmployee = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_DATA_EMPLOYEE});

    Services.approved.dataEmployee()
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessDataEmployee());
        } else {
          return dispatch(fErrorDataEmployee(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorDataEmployee(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Create/Update data assets */
export const fResetCreateAssets = () => ({
  type: types.RESET_CREATE_ASSETS,
});

export const fErrorCreateAssets = error => ({
  type: types.ERROR_CREATE_ASSETS,
  payload: error,
});

export const fSuccessCreateAssets = () => ({
  type: types.SUCCESS_CREATE_ASSETS,
});

export const fFetchCreateAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_ASSETS});

    Services.approved.createAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateAssets());
        } else {
          return dispatch(fErrorCreateAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

export const fErrorUpdateAssets = error => ({
  type: types.ERROR_UPDATE_ASSETS,
  payload: error,
});

export const fSuccessUpdateAssets = () => ({
  type: types.SUCCESS_UPDATE_ASSETS,
});

export const fFetchUpdateAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_ASSETS});

    Services.approved.updateAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateAssets());
        } else {
          return dispatch(fErrorUpdateAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Approved data assets */
export const fErrorApprovedAssets = error => ({
  type: types.ERROR_APPROVED_RECALL_ASSETS,
  payload: error,
});

export const fSuccessApprovedAssets = () => ({
  type: types.SUCCESS_APPROVED_RECALL_ASSETS,
});

export const fFetchApprovedAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_APPROVED_RECALL_ASSETS});

    Services.approved.approvedAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessApprovedAssets());
        } else {
          return dispatch(fErrorApprovedAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorApprovedAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Recall data assets */
export const fErrorRecallAssets = error => ({
  type: types.ERROR_APPROVED_RECALL_ASSETS,
  payload: error,
});

export const fSuccessRecallAssets = () => ({
  type: types.SUCCESS_APPROVED_RECALL_ASSETS,
});

export const fFetchRecallAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_APPROVED_RECALL_ASSETS});

    Services.approved.recallAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRecallAssets());
        } else {
          return dispatch(fErrorRecallAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRecallAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Repair data assets */
export const fErrorRepairAssets = error => ({
  type: types.ERROR_REPAIR_ASSETS,
  payload: error,
});

export const fSuccessRepairAssets = () => ({
  type: types.SUCCESS_REPAIR_ASSETS,
});

export const fFetchRepairAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REPAIR_ASSETS});

    Services.approved.repairAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRepairAssets());
        } else {
          return dispatch(fErrorRepairAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRepairAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Liquidation data assets */
export const fErrorLiquidationAssets = error => ({
  type: types.ERROR_LIQUIDATION_ASSETS,
  payload: error,
});

export const fSuccessLiquidationAssets = () => ({
  type: types.SUCCESS_LIQUIDATION_ASSETS,
});

export const fFetchLiquidationAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIQUIDATION_ASSETS});

    Services.approved.liquidationAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessLiquidationAssets());
        } else {
          return dispatch(fErrorLiquidationAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorLiquidationAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Reuse data assets */
export const fErrorReuseAssets = error => ({
  type: types.ERROR_REUSE_ASSETS,
  payload: error,
});

export const fSuccessReuseAssets = () => ({
  type: types.SUCCESS_REUSE_ASSETS,
});

export const fFetchReuseAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REUSE_ASSETS});

    Services.approved.reuseAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessReuseAssets());
        } else {
          return dispatch(fErrorReuseAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorReuseAssets(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Create data supplier */
export const fErrorCreateSupplier = error => ({
  type: types.ERROR_CREATE_SUPPLIER,
  payload: error,
});

export const fSuccessCreateSupplier = newSupplier => {
  return dispatch => {
    dispatch({type: types.UPDATE_MASTER_SUPPLIER, payload: newSupplier});
    dispatch({type: types.SUCCESS_CREATE_SUPPLIER});
  };
};

export const fFetchCreateSupplier = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_SUPPLIER});

    Services.approved.createSupplier(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateSupplier(res.data));
        } else {
          return dispatch(fErrorCreateSupplier(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateSupplier(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Update process */
export const fErrorUpdateProcess = error => ({
  type: types.ERROR_UPDATE_PROCESS,
  payload: error,
});

export const fSuccessUpdateProcess = () => ({
  type: types.SUCCESS_UPDATE_PROCESS,
});

export const fFetchUpdateProcess = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_PROCESS});

    Services.approved.updateProcess(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateProcess());
        } else {
          return dispatch(fErrorUpdateProcess(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateProcess(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** List request handle */
export const fResetApprovedRequest = () => ({
  type: types.RESET_APPROVED_REQUEST
});

export const fErrorListRequestHandle = error => ({
  type: types.ERROR_LIST_REQUEST_HANDLE,
  payload: error,
});

export const fSuccessListRequestHandle = (data, count) => ({
  type: types.SUCCESS_LIST_REQUEST_HANDLE,
  payload: {
    list: data.listRequest,
    process: data.listProcessApprove,
    details: data.listRequestDetail,
    count,
  },
});

export const fFetchListRequestHandle = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_REQUEST_HANDLE});

    Services.approved.listRequest(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListRequestHandle(res.data, res.totalRow));
        } else {
          return dispatch(fErrorListRequestHandle(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListRequestHandle(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Approved/Reject request */
export const fErrorApprovedRequest = error => ({
  type: types.ERROR_APPROVED_REQUEST,
  payload: error,
});

export const fSuccessApprovedRequest = () => ({
  type: types.SUCCESS_APPROVED_REQUEST,
});

export const fFetchApprovedRequest = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_APPROVED_REQUEST});

    Services.approved.approvedRequest(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessApprovedRequest(res.data));
        } else {
          return dispatch(fErrorApprovedRequest(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorApprovedRequest(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

export const fErrorListRequest = error => ({
  type: types.ERROR_LIST_REQUEST,
  payload: error,
});

export const fSuccessListRequest = (type, data) => ({
  type: types.SUCCESS_LIST_REQUEST,
  payload: {typeRequest: type, dataRequest: data},
});

export const fFetchListRequest = (type, params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_REQUEST});

    Services.approved.listRequest(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListRequest(type, res));
        } else {
          return dispatch(fErrorListRequest(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListRequest(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Create data request */
export const fErrorCreateRequest = error => ({
  type: types.ERROR_CREATE_REQUEST,
  payload: error,
});

export const fSuccessCreateRequest = () => ({
  type: types.SUCCESS_CREATE_REQUEST,
});

export const fFetchCreateRequest = (type, params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_REQUEST});

    if (type === "allow") {
      Services.approved.createRequestAllow(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateRequest());
        } else {
          return dispatch(fErrorCreateRequest(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateRequest(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
    } else {
      Services.approved.createRequestDamLos(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateRequest());
        } else {
          return dispatch(fErrorCreateRequest(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateRequest(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
    }
  };
};