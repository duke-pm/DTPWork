import * as types from "../actions/types";

export const initialState = {
  submittingListAssets: false,
  submittingHistoryAsset: false,
  submittingDataEmployee: false,
  submittingCreateAssets: false,
  submittingUpdateAssets: false,
  submittingApprovedRecallAssets: false,
  submittingRepairAssets: false,
  submittingLiquidationAssets: false,
  submittingReuseAssets: false,

  successListAssets: false,
  errorListAssets: false,
  errorHelperListAssets: "",

  successHistoryAsset: false,
  errorHistoryAsset: false,
  errorHelperHistoryAsset: "",

  successDataEmployee: false,
  errorDataEmployee: false,
  errorHelperDataEmployee: "",

  successCreateAssets: false,
  errorCreateAssets: false,
  errorHelperCreateAssets: "",

  successUpdateAssets: false,
  errorUpdateAssets: false,
  errorHelperUpdateAssets: "",

  successApprovedRecallAssets: false,
  errorApprovedRecallAssets: false,
  errorHelperApprovedRecallAssets: "",

  successRepairAssets: false,
  errorRepairAssets: false,
  errorHelperRepairAssets: "",

  successLiquidationAssets: false,
  errorLiquidationAssets: false,
  errorHelperLiquidationAssets: "",

  successReuseAssets: false,
  errorReuseAssets: false,
  errorHelperReuseAssets: "",

  historyAsset: [],

  listAssetsAll: [],
  listAssetsNotUse: [],
  listAssetsUsing: [],
  listAssetsRepair: [],
  listAssetsDamageLost: [],
  listAssetsLiquidation: [],
  numAssetsAll: 0,
  numAssetsNotUse: 0,
  numAssetsUsing: 0,
  numAssetsRepair: 0,
  numAssetsDamage: 0,
  numAssetsLost: 0,
  numAssetsLiquidation: 0,
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    //** List assets */
    case types.START_LIST_ASSETS:
      return {
        ...state,
        submittingListAssets: true,
        successListAssets: false,
        errorListAssets: false,
        errorHelperListAssets: "",
      };
    case types.ERROR_LIST_ASSETS:
      return {
        ...state,
        submittingListAssets: false,
        successListAssets: false,
        errorListAssets: true,
        errorHelperListAssets: payload,
      };
    case types.SUCCESS_LIST_ASSETS:
      let {type, data} = payload;
      let newData = [],
        numAssetsAll = 0,
        numAssetsNotUse = 0,
        numAssetsUsing = 0,
        numAssetsRepair = 0,
        numAssetsDamage = 0,
        numAssetsLost = 0,
        numAssetsLiquidation = 0;

      switch (type) {
        case "listAssetsNotUse":
          newData = data?.data?.listItem || [];
          numAssetsAll = data?.data?.header.countAll || 0;
          numAssetsNotUse = data?.totalRow || data?.data?.header.countNoUseYet;
          numAssetsUsing = data?.data?.header.countUsing || 0;
          numAssetsRepair = data?.data?.header.countWarrantyRepair || 0;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.data?.header.countLiquidation || 0;
          break;
        case "listAssetsUsing":
          newData = data?.data?.listItem || [];
          numAssetsAll = data?.data?.header.countAll || 0;
          numAssetsNotUse = data?.data?.header.countNoUseYet || 0;
          numAssetsUsing = data?.totalRow || data?.data?.header.countUsing;
          numAssetsRepair = data?.data?.header.countWarrantyRepair || 0;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.data?.header.countLiquidation || 0;
          break;
        case "listAssetsRepair":
          newData = data?.data?.listItem || [];
          numAssetsAll = data?.data?.header.countAll || 0;
          numAssetsNotUse = data?.data?.header.countNoUseYet || 0;
          numAssetsUsing = data?.data?.header.countUsing || 0;
          numAssetsRepair = data?.totalRow || data?.data?.header.countWarrantyRepair;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.data?.header.countLiquidation || 0;
          break;
        case "listAssetsDamageLost":
          newData = data?.data?.listItem || [];
          numAssetsAll = data?.data?.header.countAll || 0;
          numAssetsNotUse = data?.data?.header.countNoUseYet || 0;
          numAssetsUsing = data?.data?.header.countUsing || 0;
          numAssetsRepair = data?.data?.header.countWarrantyRepair || 0;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.data?.header.countLiquidation || 0;
          break;
        case "listAssetsLiquidation":
          newData = data?.data?.listItem || [];

          numAssetsAll = data?.data?.header.countAll || 0;
          numAssetsNotUse = data?.data?.header.countNoUseYet || 0;
          numAssetsUsing = data?.data?.header.countUsing || 0;
          numAssetsRepair = data?.data?.header.countWarrantyRepair || 0;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.totalRow || data?.data?.header.countLiquidation;
          break;

        default:
          newData = data?.data?.listItem || [];
          numAssetsAll = data?.totalRow || data?.data?.header.countAll;
          numAssetsNotUse = data?.data?.header.countNoUseYet || 0;
          numAssetsUsing = data?.data?.header.countUsing || 0;
          numAssetsRepair = data?.data?.header.countWarrantyRepair || 0;
          numAssetsDamage = data?.data?.header.countDamaged || 0;
          numAssetsLost = data?.data?.header.countLost || 0;
          numAssetsLiquidation = data?.data?.header.countLiquidation || 0;
          break;
      };

      return {
        ...state,
        submittingListAssets: false,
        successListAssets: true,
        errorListAssets: false,
        errorHelperListAssets: "",
        [type]: newData,
        numAssetsAll,
        numAssetsNotUse,
        numAssetsUsing,
        numAssetsRepair,
        numAssetsDamage,
        numAssetsLost,
        numAssetsLiquidation,
      };

    //** History asset */
    case types.START_HISTORY_ASSET:
      return {
        ...state,
        submittingHistoryAsset: true,
        successHistoryAsset: false,
        errorHistoryAsset: false,
        errorHelperHistoryAsset: "",
      };
    case types.ERROR_HISTORY_ASSET:
      return {
        ...state,
        submittingHistoryAsset: false,
        successHistoryAsset: false,
        errorHistoryAsset: true,
        errorHelperHistoryAsset: payload,
      };
    case types.SUCCESS_HISTORY_ASSET:
      return {
        ...state,
        submittingHistoryAsset: false,
        successHistoryAsset: true,
        errorHistoryAsset: false,
        errorHelperHistoryAsset: "",
        historyAsset: payload,
      };

    //** Data employee */
    case types.START_DATA_EMPLOYEE:
      return {
        ...state,
        submittingDataEmployee: true,
        successDataEmployee: false,
        errorDataEmployee: false,
        errorHelperDataEmployee: "",
      };
    case types.ERROR_DATA_EMPLOYEE:
      return {
        ...state,
        submittingDataEmployee: false,
        successDataEmployee: false,
        errorDataEmployee: true,
        errorHelperDataEmployee: payload,
      };
    case types.SUCCESS_DATA_EMPLOYEE:
      return {
        ...state,
        submittingDataEmployee: false,
        successDataEmployee: true,
        errorDataEmployee: false,
        errorHelperDataEmployee: "",
      };

  //** Create/Update data assets */
  case types.RESET_CREATE_ASSETS:
    return {
      ...state,
      submittingCreateAssets: false,
      successCreateAssets: false,
      errorCreateAssets: false,
      errorHelperCreateAssets: "",

      submittingUpdateAssets: false,
      successUpdateAssets: false,
      errorUpdateAssets: false,
      errorHelperUpdateAssets: "",

      submittingApprovedRecallAssets: false,
      successApprovedRecallAssets: false,
      errorApprovedRecallAssets: false,
      errorHelperApprovedRecallAssets: "",

      submittingRepairAssets: false,
      successRepairAssets: false,
      errorRepairAssets: false,
      errorHelperRepairAssets: "",

      submittingLiquidationAssets: false,
      successLiquidationAssets: false,
      errorLiquidationAssets: false,
      errorHelperLiquidationAssets: "",

      submittingReuseAssets: false,
      successReuseAssets: false,
      errorReuseAssets: false,
      errorHelperReuseAssets: "",
    };
  case types.START_CREATE_ASSETS:
    return {
      ...state,
      submittingCreateAssets: true,
      successCreateAssets: false,
      errorCreateAssets: false,
      errorHelperCreateAssets: "",
    };
  case types.ERROR_CREATE_ASSETS:
    return {
      ...state,
      submittingCreateAssets: false,
      successCreateAssets: false,
      errorCreateAssets: true,
      errorHelperCreateAssets: payload,
    };
  case types.SUCCESS_CREATE_ASSETS:
    return {
      ...state,
      submittingCreateAssets: false,
      successCreateAssets: true,
      errorCreateAssets: false,
      errorHelperCreateAssets: "",
    };
  case types.START_UPDATE_ASSETS:
    return {
      ...state,
      submittingUpdateAssets: true,
      successUpdateAssets: false,
      errorUpdateAssets: false,
      errorHelperUpdateAssets: "",
    };
  case types.ERROR_UPDATE_ASSETS:
    return {
      ...state,
      submittingUpdateAssets: false,
      successUpdateAssets: false,
      errorUpdateAssets: true,
      errorHelperUpdateAssets: payload,
    };
  case types.SUCCESS_UPDATE_ASSETS:
      return {
        ...state,
        submittingUpdateAssets: false,
        successUpdateAssets: true,
        errorUpdateAssets: false,
        errorHelperUpdateAssets: "",
      };

  //** Approved/Recall assets */
  case types.START_APPROVED_RECALL_ASSETS:
    return {
      ...state,
      submittingApprovedRecallAssets: true,
      successApprovedRecallAssets: false,
      errorApprovedRecallAssets: false,
      errorHelperApprovedRecallAssets: "",
    };
  case types.ERROR_APPROVED_RECALL_ASSETS:
    return {
      ...state,
      submittingApprovedRecallAssets: false,
      successApprovedRecallAssets: false,
      errorApprovedRecallAssets: true,
      errorHelperApprovedRecallAssets: payload,
    };
  case types.SUCCESS_APPROVED_RECALL_ASSETS:
    return {
      ...state,
      submittingApprovedRecallAssets: false,
      successApprovedRecallAssets: true,
      errorApprovedRecallAssets: false,
      errorHelperApprovedRecallAssets: "",
    };

  //** Repair assets */
  case types.START_REPAIR_ASSETS:
    return {
      ...state,
      submittingRepairAssets: true,
      successRepairAssets: false,
      errorRepairAssets: false,
      errorHelperRepairAssets: "",
    };
  case types.ERROR_REPAIR_ASSETS:
    return {
      ...state,
      submittingRepairAssets: false,
      successRepairAssets: false,
      errorRepairAssets: true,
      errorHelperRepairAssets: payload,
    };
  case types.SUCCESS_REPAIR_ASSETS:
    return {
      ...state,
      submittingRepairAssets: false,
      successRepairAssets: true,
      errorRepairAssets: false,
      errorHelperRepairAssets: "",
    };

  //** Liquidation assets */
  case types.START_LIQUIDATION_ASSETS:
    return {
      ...state,
      submittingLiquidationAssets: true,
      successLiquidationAssets: false,
      errorLiquidationAssets: false,
      errorHelperLiquidationAssets: "",
    };
  case types.ERROR_LIQUIDATION_ASSETS:
    return {
      ...state,
      submittingLiquidationAssets: false,
      successLiquidationAssets: false,
      errorLiquidationAssets: true,
      errorHelperLiquidationAssets: payload,
    };
  case types.SUCCESS_LIQUIDATION_ASSETS:
    return {
      ...state,
      submittingLiquidationAssets: false,
      successLiquidationAssets: true,
      errorLiquidationAssets: false,
      errorHelperLiquidationAssets: "",
    };

  //** Reuse assets */
  case types.START_REUSE_ASSETS:
    return {
      ...state,
      submittingReuseAssets: true,
      successReuseAssets: false,
      errorReuseAssets: false,
      errorHelperReuseAssets: "",
    };
  case types.ERROR_REUSE_ASSETS:
    return {
      ...state,
      submittingReuseAssets: false,
      successReuseAssets: false,
      errorReuseAssets: true,
      errorHelperReuseAssets: payload,
    };
  case types.SUCCESS_REUSE_ASSETS:
    return {
      ...state,
      submittingReuseAssets: false,
      successReuseAssets: true,
      errorReuseAssets: false,
      errorHelperReuseAssets: "",
    };

    default:
      return state;
  };
};
