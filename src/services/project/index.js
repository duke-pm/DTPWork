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
  listProjectsOverview: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Year = params["Year"];
      if (params["FromDate"]) {
        tmpConfigs.params.FromDate = params["FromDate"];
      }
      if (params["ToDate"]) {
        tmpConfigs.params.ToDate = params["ToDate"];
      }
      if (params["StatusID"]) {
        tmpConfigs.params.StatusID = params["StatusID"];
      }
      if (params["OwnerID"]) {
        tmpConfigs.params.OwnerID = params["OwnerID"];
      }
      if (params["SectorID"]) {
        tmpConfigs.params.SectorID = params["SectorID"];
      }
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.PROJECT_OVERVIEW,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST PROJECT OVERVIEW => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST PROJECT OVERVIEW => ", error);
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
  listTaskAll: params => {
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
        jwtServiceConfig.baseURL + Routes.PROJECT.LIST_TASK_ALL,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST TASK ALL => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST TASK ALL => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateTask: params => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("TaskID", params.TaskID);
      formData.append("TaskName", params.TaskName);
      formData.append("TaskTypeID", params.TaskTypeID);
      formData.append("PrjID", params.PrjID);
      formData.append("ParentID", params.ParentID);
      formData.append("Descr", params.Descr);
      formData.append("StartDate", params.StartDate);
      formData.append("EndDate", params.EndDate);
      formData.append("Owner", params.Owner);
      formData.append("Priority", params.Priority);
      formData.append("StatusID", params.StatusID);
      formData.append("SectorID", params.SectorID);
      formData.append("Grade", params.Grade);
      formData.append("Component", params.Component);
      formData.append("Author", params.Author);
      formData.append("OriginPublisher", params.OriginPublisher);
      formData.append("OwnershipDTP", params.OwnershipDTP);
      formData.append("AttachFiles", params.AttachFiles);
      formData.append("Percentage", params.Percentage);
      formData.append("Version", params.Version);
      formData.append("LstUserInvited", params.LstUserInvited);

      API.post(
        jwtServiceConfig.baseURL + Routes.PROJECT.UPDATE_TASK,
        formData,
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
  updateGanttTask: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.PROJECT.UPDATE_GANTT_TASK,
        params,
      )
        .then(response => {
          log("FETCH UPDATE GANTT TASK => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE GANTT TASK => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  taskDetails: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.TaskID = params["TaskID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.PROJECT.TASK_DETAILS,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH TASK DETAILS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR TASK DETAILS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  createComment: params => {
    return new Promise((resolve, reject) => {
      API.post(
        jwtServiceConfig.baseURL + Routes.PROJECT.TASK_COMMENT,
        params,
      )
        .then(response => {
          log("FETCH TASK COMMENT => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR TASK COMMENT => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  follow: params => {
    return new Promise((resolve, reject) => {
      API.post(
        jwtServiceConfig.baseURL + Routes.PROJECT.TASK_WATCHER,
        params,
      )
        .then(response => {
          log("FETCH TASK WATCHER => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR TASK WATCHER => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  taskUpdate: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.PROJECT.TASK_UPDATE,
        params,
      )
        .then(response => {
          log("FETCH TASK UPDATE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR TASK UPDATE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

};
