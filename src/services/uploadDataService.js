import { getLoggedInUserCache } from "../container/ApplicationsCache";
import { API_URL, IS_LOCAL } from "../utils/constants";

export const getDataStatuses = (successCallback, errorCallback) => {
  fetch(API_URL + "/data_process_status", {
    mode: "cors",
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

export const getSignedUploadUrl = (
  sourceId,
  fileType,
  fileGuid,
  fileName,
  contentType,
  successCallback,
  errorCallback
) => {
  fetch(
    API_URL +
      "/generate_upload_url?fileName=" +
      fileName +
      "&sourceId=" +
      sourceId +
      "&fileType=" +
      fileType +
      "&fileUUID=" +
      fileGuid +
      "&contentType=" +
      contentType,
    {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLoggedInUserCache(),
      },
    }
  )
    .then((response) => {
      return response.text();
    })
    .then((url) => successCallback(url))
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

export const uploadFile = (
  sourceId,
  fileType,
  fileGuid,
  fileToBeUploaded,
  successCallback,
  errorCallback
) => {
  var formData = new FormData();
  // formData.append('fileName', fileGuid + "_" + fileToBeUploaded.name);
  formData.append("file", fileToBeUploaded);
  const content_type = {
    fino_transactions: "application/octet-stream",
    aadharshila_transactions: "application/octet-stream",
    agent_stmt: "application/octet-stream",
    api_stmt: "application/octet-stream",
  };
  getSignedUploadUrl(
    sourceId,
    fileType,
    fileGuid,
    fileToBeUploaded.name,
    content_type[fileType] ||
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    (url) => {
      fetch(url, {
        method: "PUT",
        headers: {
          // 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          "Content-Type":
            content_type[fileType] ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: fileToBeUploaded,
      })
        .then((response) => {
          successCallback(response.text());
        })
        .then(successCallback)
        .catch((error) => {
          console.log(error);
          errorCallback(error);
        });
    },
    (error) => {
      console.log(error);
      errorCallback(error);
    }
  );
};
