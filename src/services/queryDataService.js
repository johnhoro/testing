import { getLoggedInUserCache } from "../container/ApplicationsCache";
import { API_URL, IS_LOCAL } from "../utils/constants";

export const getQueryData = (request) => {
  return fetch(API_URL + '/execute_query?pivot="true"', {
    mode: "cors",
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
    body: JSON.stringify({ ...request.queryData }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let resultJson = {};
      resultJson[request.dataId] = json;
      return resultJson;
    })
    .catch((error) => {
      let resultJson = {};
      resultJson[request.dataId] = { schema: { fields: [] }, data: [] };
      return resultJson;
    });
};

export const getQueryDataWithCallback = (
  body,
  successCallback,
  errorCallback
) => {
  return fetch(API_URL + '/execute_query?pivot="true"', {
    mode: "cors",
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      successCallback(json);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const getDataListData = (params, successCallback, errorCallback) => {
  fetch(API_URL + "/execute_query", {
    mode: "cors",
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      successCallback(json);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const getDataListDownload = (
  pivot,
  body,
  successCallback,
  errorCallback
) => {
  let url = "/execute_download";
  if (pivot === true) {
    url += "?pivot=true";
  }
  fetch(API_URL + url, {
    mode: "cors",
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then(successCallback)
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const triggerRecon = (successCallback, errorCallback) => {
  fetch(API_URL + "/execute_recon", {
    mode: "cors",
    // mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoggedInUserCache(),
    },
  })
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};
