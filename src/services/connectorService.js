import { getLoggedInUserCache } from "../container/ApplicationsCache";
import { API_URL, IS_LOCAL } from "../utils/constants";

export const addDataSource = (connector, successCallback, errorCallback) => {
  console.log(connector);
  return fetch(API_URL + "/datasources", {
    // mode: 'cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
    body: JSON.stringify(connector),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return successCallback(json);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const getDataSources = (successCallback, errorCallback) => {
  fetch(API_URL + "/datasources", {
    // mode: 'cors',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return successCallback(data);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const getConnectors = (request) => {
  return fetch("api/v1/connectors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .then((error) => {
      return error;
    });
};
