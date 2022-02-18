import * as types from "../actions/types";

export const initialState = {
  submittingListAssets: false,
  submittingHistoryAsset: false,
  submittingDataEmployee: false,

  successListAssets: false,
  errorListAssets: false,
  errorHelperListAssets: "",

  successHistoryAsset: false,
  errorHistoryAsset: false,
  errorHelperHistoryAsset: "",

  successDataEmployee: false,
  errorDataEmployee: false,
  errorHelperDataEmployee: "",

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


    default:
      return state;
  };
};
