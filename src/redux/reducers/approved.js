import * as types from "../actions/types";

export const initialState = {
  submittingListAssets: false,
  submittingHistoryAsset: false,

  successListAssets: false,
  errorListAssets: false,
  errorHelperListAssets: "",

  successHistoryAsset: false,
  errorHistoryAsset: false,
  errorHelperHistoryAsset: "",

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
    /** List assets */
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
        numAssetsAll = data?.data?.header.countAll || 0,
        numAssetsNotUse = data?.data?.header.countNoUseYet || 0,
        numAssetsUsing = data?.data?.header.countUsing || 0,
        numAssetsRepair = data?.data?.header.countWarrantyRepair || 0,
        numAssetsDamage = data?.data?.header.countDamaged || 0,
        numAssetsLost = data?.data?.header.countLost || 0,
        numAssetsLiquidation = data?.data?.header.countLiquidation || 0;

      switch (type) {
        case "listAssetsAll":
          newData = data?.data?.listItem || [];
          break;
        case "listAssetsNotUse":
          newData = data?.data?.listItem || [];
          break;
        case "listAssetsUsing":
          newData = data?.data?.listItem || [];
          break;
        case "listAssetsRepair":
          newData = data?.data?.listItem || [];
          break;
        case "listAssetsDamageLost":
          newData = data?.data?.listItem || [];
          break;
        case "listAssetsLiquidation":
          newData = data?.data?.listItem || [];
          break;

        default:
          newData = data?.data?.listItem || [];
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

    /** History asset */
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

    default:
      return state;
  };
};
