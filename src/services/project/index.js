import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";
import {log} from "utils/Utils";

export default {
  /** Project */
  listProject: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      if (params["ProjectID"]) {
        tmpConfigs.params.ProjectID = params["ProjectID"];
      }
      tmpConfigs.params.Year = params["Year"];
      tmpConfigs.params.StatusID = params["StatusID"];
      tmpConfigs.params.OwnerID = params["OwnerID"];
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.LIST_PROJECT,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST PROJECT => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST PROJECT => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateProject: params => {
    return new Promise((resolve, reject) => {
      API.post(
        jwtServiceConfig.baseURL + Routes.PROJECT.UPDATE_PROJECT,
        params,
      )
        .then(response => {
          log("FETCH UPDATE PROJECT => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE PROJECT => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeProject: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.PrjID = params["PrjID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.REMOVE_PROJECT,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH REMOVE PROJECT => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE PROJECT => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Task */
  listTask: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      if (params["TaskID"]) {
        tmpConfigs.params.TaskID = params["TaskID"];
      }
      tmpConfigs.params.PrjID = params["PrjID"];
      tmpConfigs.params.StatusID = params["StatusID"];
      tmpConfigs.params.OwnerID = params["OwnerID"];
      tmpConfigs.params.SectorID = params["SectorID"];
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.LIST_TASK,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST TASK => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST TASK => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateTask: params => {
    return new Promise((resolve, reject) => {
      API.post(
        jwtServiceConfig.baseURL + Routes.PROJECT.UPDATE_TASK,
        params,
      )
        .then(response => {
          log("FETCH UPDATE TASK => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE TASK => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeTask: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.TaskID = params["TaskID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.REMOVE_TASK,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH REMOVE TASK => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE TASK => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
