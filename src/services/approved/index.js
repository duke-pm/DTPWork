import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";

export default {
  listAssets: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.StatusID = params["StatusID"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.SortColumn = "";
      tmpConfigs.params.SortDirection = "desc";

      API.get(jwtServiceConfig.baseURL + Routes.APPROVED.LIST_ASSETS, tmpConfigs)
        .then(response => {
          console.log("FETCH LIST ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR LIST ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  historyAsset: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.ID = params["ID"];

      API.get(jwtServiceConfig.baseURL + Routes.APPROVED.HISTORY_ASSET, tmpConfigs)
        .then(response => {
          console.log("FETCH LIST ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR LIST ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  dataEmployee: () => {
    return new Promise((resolve, reject) => {
      API.get(jwtServiceConfig.baseURL + Routes.APPROVED.DATA_EMPLOYEE, {params: {}})
        .then(response => {
          console.log("FETCH DATA EMPLOYEE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR DATA EMPLOYEE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  createAssets: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.CREATE_ASSETS, params)
        .then(response => {
          console.log("FETCH CREATE ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR CREATE ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateAssets: params => {
    return new Promise((resolve, reject) => {
      API.put(jwtServiceConfig.baseURL + Routes.APPROVED.UPDATE_ASSETS, params)
        .then(response => {
          console.log("FETCH UPDATE ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR UPDATE ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  approvedAssets: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AssetID", params.AssetID);
      formData.append("EmpCode", params.EmpCode);
      formData.append("DeptCode", params.DeptCode);
      formData.append("RegionCode", params.RegionCode);
      formData.append("Reasons", params.Reasons);
      formData.append("JobTitle", params.JobTitle);
      formData.append("FileUpload", params.FileUpload || "");
      formData.append("TransDate", params.TransDate);
      formData.append("TypeUpdate", "Allocation");

      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.APPROVED_ASSETS, formData)
        .then(response => {
          console.log("FETCH APPROVED ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR APPROVED ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  recallAssets: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AssetID", params.AssetID);
      formData.append("EmpCode", params.EmpCode);
      formData.append("DeptCode", params.DeptCode);
      formData.append("RegionCode", params.RegionCode);
      formData.append("Reasons", params.Reasons);
      formData.append("JobTitle", params.JobTitle);
      formData.append("FileUpload", params.FileUpload || "");
      formData.append("TransDate", params.TransDate);
      formData.append("TypeUpdate", "Recovery");

      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.RECALL_ASSETS, formData)
        .then(response => {
          console.log("FETCH RECALL ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR RECALL ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  repairAssets: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AssetID", params.AssetID);
      formData.append("EmpCode", params.EmpCode);
      formData.append("DeptCode", params.DeptCode);
      formData.append("RegionCode", params.RegionCode);
      formData.append("Reasons", params.Reasons);
      formData.append("JobTitle", params.JobTitle);
      formData.append("FileUpload", params.FileUpload || "");
      formData.append("TransDate", params.TransDate);
      formData.append("SupplierRepair", params.SupplierRepair);
      formData.append("ExpCost", params.ExpCost);
      formData.append("TypeUpdate", "Repair");

      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.REPAIR_ASSETS, formData)
        .then(response => {
          console.log("FETCH REPAIR ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR REPAIR ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  liquidationAssets: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AssetID", params.AssetID);
      formData.append("EmpCode", params.EmpCode);
      formData.append("DeptCode", params.DeptCode);
      formData.append("RegionCode", params.RegionCode);
      formData.append("Reasons", params.Reasons);
      formData.append("JobTitle", params.JobTitle);
      formData.append("FileUpload", params.FileUpload || "");
      formData.append("TransDate", params.TransDate);
      formData.append("TypeUpdate", "Liquidate");

      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.LIQUIDATION_ASSETS, formData)
        .then(response => {
          console.log("FETCH LIQUIDATION ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR LIQUIDATION ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  reuseAssets: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AssetID", params.AssetID);
      formData.append("EmpCode", params.EmpCode);
      formData.append("DeptCode", params.DeptCode);
      formData.append("RegionCode", params.RegionCode);
      formData.append("Reasons", params.Reasons);
      formData.append("JobTitle", params.JobTitle);
      formData.append("FileUpload", params.FileUpload || "");
      formData.append("TransDate", params.TransDate);
      formData.append("EndRepairDate", params.EndRepairDate);
      formData.append("SupplierRepair", params.SupplierRepair);
      formData.append("ActCost", params.ActCost);
      formData.append("TypeUpdate", "Reuse");

      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.REUSE_ASSETS, formData)
        .then(response => {
          console.log("FETCH REUSE ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR REUSE ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  createSupplier: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.APPROVED.CREATE_SUPPLIER, params)
        .then(response => {
          console.log("FETCH CREATE SUPPLIER => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR CREATE SUPPLIER => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};