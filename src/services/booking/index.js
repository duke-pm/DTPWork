import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";
import {log} from "utils/Utils";

export default {
  /** Booking - List */
  listBooking: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.FromDate = params["FromDate"];
      tmpConfigs.params.ToDate = params["ToDate"];
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.ResourceID = params["ResourceID"];
      tmpConfigs.params.IsMyBooking = params["IsMyBooking"] || false;
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.LIST_BOOKING,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST BOOKING => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST BOOKING => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateBooking: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.BOOKING.UPDATE_BOOKING,
        params,
      )
        .then(response => {
          log("FETCH UPDATE BOOKING => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE BOOKING => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeBooking: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.BookID = params["BookID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.REMOVE_BOOKING,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH REMOVE BOOKING => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE BOOKING => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Booking - Group resource */
  listGroupResource: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.LIST_GROUP_RESOURCE,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST GROUP RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST GROUP RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateGroupResource: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.BOOKING.UPDATE_GROUP_RESOURCE,
        params,
      )
        .then(response => {
          log("FETCH UPDATE GROUP RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE GROUP RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeGroupResource: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.GroupID = params["GroupID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.REMOVE_GROUP_RESOURCE,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH REMOVE GROUP RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE GROUP RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Booking - Resource */
  listResource: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.LIST_RESOURCE,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH LIST RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR LIST RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateResource: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.BOOKING.UPDATE_RESOURCE,
        params,
      )
        .then(response => {
          log("FETCH UPDATE RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeResource: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.ResourceID = params["ResourceID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(
        jwtServiceConfig.baseURL + Routes.BOOKING.REMOVE_RESOURCE,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH REMOVE RESOURCE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE RESOURCE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
