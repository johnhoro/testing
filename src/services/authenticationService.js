export const registerUserService = (request) => {
  return fetch('api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return error;
    });
};

export const loginUserService = (request) => {
  return fetch('api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .then(error => {
      return error;
    });
};
