import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";
import {log} from "utils/Utils";

export default {
  getAll: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.ListType = params["ListType"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_ALL, tmpConfigs)
        .then(response => {
          log("FETCH MASTER DATA => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR MASTER DATA => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  getAssetsByUser: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.EmpCode = params["EmpCode"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_ASSETS_BY_USER, tmpConfigs)
        .then(response => {
          log("FETCH ASSETS BY USER => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR ASSETS BY USER => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  getUsersByLogin: () => {
    return new Promise((resolve, reject) => {
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_USERS_BY_LOGIN)
        .then(response => {
          log("FETCH USERS BY LOGIN => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR USERS BY LOGIN => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  getSubProjects: () => {
    return new Promise((resolve, reject) => {
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_PROJECTS_FOR_SUB)
        .then(response => {
          log("FETCH SUB PROJECTS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR SUB PROJECTS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  getSubTasks: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.PrjID = params["PrjID"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_TASKS_FOR_SUB, tmpConfigs)
        .then(response => {
          log("FETCH SUB TASKS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR SUB TASKS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
