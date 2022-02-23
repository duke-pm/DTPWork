const Routes = {
  AUTHENTICATION: {
    LOGIN: "/User/Login",
    REFRESH_TOKEN: "/User/RefreshToken",
    CHANGE_PASSWORD: "/User/ChangePassword",
    FORGOT_PASSWORD: "/User/ForgotPassword",
    UPDATE_PASSWORD: "/User/UpdateNewPassword",
    CHECK_TOKEN_PASSWORD: "/User/CheckToken",
  },
  MASTER_DATA: {
    GET_ALL: "/MasterData/GetDataForForm",
    // GET_ASSETS_BY_USER: "/Assets/GetListByUser",
  },
  APPROVED: {
    LIST_ASSETS: "/Assets/GetList",
    HISTORY_ASSET: "/Assets/GetHistoryByID",
    DATA_EMPLOYEE: "/Assets/GetDataEmployee",
    CREATE_ASSETS: "/Assets/Create",
    UPDATE_ASSETS: "/Assets/Update",
    APPROVED_ASSETS: "/AssetTrans/ProcessAsset",
    RECALL_ASSETS: "/AssetTrans/ProcessAsset",
    REPAIR_ASSETS: "/AssetTrans/ProcessAsset",
    LIQUIDATION_ASSETS: "/AssetTrans/ProcessAsset",
    REUSE_ASSETS: "/AssetTrans/ProcessAsset",
    CREATE_SUPPLIER: "/Supplier/Modify",

    LIST_REQUEST: "/RQAsset/GetList",

    EXPORT_ASSETS: "/Assets/ExportAsset",
    EXPORT_APPROVED_ASSETS: "/RQAsset/ExportAllocation",
    EXPORT_RECALL_ASSETS: "/RQAsset/ExportRequestRecovery",
  },
  // APPROVED: {
  //   LIST_REQUEST: "/RQAsset/GetList",
  //   REQUEST_DETAIL: "/RQAsset/GetByID",
  //   ADD_REQUEST: "/RQAsset/CreateAllocation",
  //   ADD_REQUEST_LOST_DAMAGE: "/RQAsset/CreateHandling",
  //   APPROVED_REQUEST: "/RequestApprove/Approve",
  //   REJECT_REQUEST: "/RequestApprove/Approve",
  // },
  // PROJECT_MANAGEMENT: {
  //   LIST_PROJECT: "/Project/GetList",
  //   LIST_TASK: "/Task/GetList",
  //   TASK_DETAIL: "/Task/GetByID",
  //   TASK_UPDATE: "/Task/UpdateTaskInfo",
  //   TASK_COMMENT: "/TaskActivity/Modify",
  //   TASK_WATCHER: "/TaskWatcher/Modify",
  //   PROJECT_OVERVIEW: "/Project/GetListOverview",
  // },
  // BOOKING: {
  //   LIST_BOOKING: "/TransBooking/GetList",
  //   ADD_BOOKING: "/TransBooking/Modify",
  //   UPDATE_BOOKING: "/TransBooking/Modify",
  //   REMOVE_BOOKING: "/TransBooking/Remove",
  //   BOOKING_DETAIL: "/TransBooking/GetByID",
  //   BOOKING_RESOURCE: "/TransBooking/GetListResource",
  // },
};

export default Routes;
