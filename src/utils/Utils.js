import React from "react";
import {Redirect} from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from 'js-cookie';
import moment from "moment";
/** COMMON */
import Constants from "./constants";

//url for production
export var url = "";
if (process.env.NODE_ENV === "development") {
  url = "";
} else {
  url = window.location.host.split("/")[1];
  if (url) {
    url = `/${window.location.host.split("/")[1]}`;
  } else url = process.env.PUBLIC_URL; /// ADD YOUR CPANEL SUB-URL
}

//Function to validate and return errors for a form
export const checkForm = (formData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    if (formData[item] === null || formData[item] === "") {
      errorState[item] = "This field is required";
    }
  });
  return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string) => {
  let extractedString = [];
  extractedString = string.split(" ");
  if (extractedString.length > 1) {
    return extractedString[extractedString.length - 2].charAt(0) + extractedString[extractedString.length - 1].charAt(0);
  } else {
    return string.charAt(0);
  }
};

//Function that calculates the from current date
export const setDeadline = (days) => {
  let todayDate = new Date();
  var newDate = new Date(todayDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Function to set deadline for projects
export const setDeadlineDays = (deadline) => {
  var currentDate = new Date();
  var difference = deadline.getTime() - currentDate.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

//Date formatter function
export const dateFormatterAlt = (date, reverse) => {
  let d = date.getUTCDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  reverse ? (date = m + "-" + d + "-" + y) : (date = y + "-" + d + "-" + m);
  return date;
};

//Date formatter function
export const dateFormatter = (date, reverse) => {
  var dateformat = date.split("-");
  //var date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
  reverse
    ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
    : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);
  return date;
};

//Month Names
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//todays Date
export const todaysDate = new Date();

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date) => {
  let d = date.getUTCDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let final = monthNames[m] + " " + d + ", " + y;
  return final;
};

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate) => {
  let d = rdate.getUTCDate();
  d < 10 && (d = "0" + d);
  let m = rdate.getMonth() + 1;
  m < 10 && (m = "0" + m);
  let y = rdate.getFullYear();
  rdate = y + "-" + m + "-" + d;

  return rdate;
};

//current Time
export const currentTime = () => {
  var hours = todaysDate.getHours();
  var minutes = todaysDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Percentage calculation
export const calcPercentage = (str1, str2) => {
  let result = Number(str2) / Number(str1);
  result = result * 100;
  return Math.floor(result);
};

//shortens a long string
export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + " " + truncate(str.substr(n - 1, str.length), n) : str;
};

export const RedirectAs404 = ({ location }) => (
  <Redirect to={Object.assign({}, location, { state: { is404: true } })} />
);

// returns upload url
export const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

export const bulkActionOptions = [
  { value: "suspend", label: "Suspend User" },
  { value: "delete", label: "Delete User" },
];

export const numberFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: "currency",
    currency: "VND",
  }).format(value);

export const removeCookies = arrCookies => {
  for (let item of arrCookies) {
    Cookies.remove(item);
  }
};

export const setCookies = (cookies, value) => {
  return Cookies.set(cookies, value, {expires: 1});
};

export const getCookies = cookies => {
  return Cookies.get(cookies) || null;
};

export const getLocalStorage = (key) => {
  let fValue = localStorage.getItem(key);
  if (fValue) {
    fValue = JSON.parse(fValue);
    return fValue;
  } else {
    return null;
  }
};

export const setLocalStorage = (key, value) => {
  let tmpValue = value;
  if (typeof tmpValue !== "string") {
    tmpValue = JSON.stringify(tmpValue);
  }
  return localStorage.setItem(key, tmpValue);
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};

export const log = (...msgs) => {
  if (process.env.NODE_ENV === 'development') console.log(...msgs);
}

export const durationDay = (start, end) => {
	const result = moment().diff(start, "days") - moment().diff(end, "days") + 1;
	return result;
};

export const expiredDate = end => {
	const result = moment().diff(end, "days");
	return result;
};

export const checkIsWrite = (menu, route) => {
  let item = null, fMenuRequest = null;
  if (menu.length > 0) {
    for (item of menu) {
      if (item.link && item.link === route) {
        return item;
      }
      if (item.subMenu && item.subMenu.length > 0) {
        fMenuRequest = checkIsWrite(item.subMenu, route);
        if (fMenuRequest) {
          return fMenuRequest;
        }
      }
    }
  }
  return fMenuRequest;
};

export const encodeData = data => {
  let encode = CryptoJS.AES.encrypt(JSON.stringify(data), Constants.LS_U_P).toString();
  // log("Encode Data: " + encode);
  return encode;
};

export const decodeData = encode => {
  let bytes = CryptoJS.AES.decrypt(encode, Constants.LS_U_P);
  let decode = bytes.toString(CryptoJS.enc.Utf8);
  decode = JSON.parse(decode);
  // log("Decode Data: " + decode);
  return decode;
};
