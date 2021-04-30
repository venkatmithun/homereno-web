import axios from 'axios';
import querystring from 'query-string';
const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';
const API_ENDPOINT = '';

function buildHeaders(extras) {
  let token = sessionStorage.getItem(TOKEN_KEY);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token,
    ...extras,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function request(props) {
  const { url, init, query, option } = props;

  const strQuery = query ? `?${querystring.stringify(query)}` : '';
  const fetchUrl = `${API_ENDPOINT}${url}${strQuery}`;
  console.log('fetchUrl', fetchUrl);

  return axios({
    url: fetchUrl,
    method: init.method,
    data: option,
    headers: buildHeaders(init.headers),
    timeout: option && option.timeout ? option.timeout : 0,
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          //   NavigationService.navigate("AuthLoading");
        } else {
          //   throw new Error(error);
        }
      } else {
        // throw new Error(error);
      }
    });
}

const Api = {
  get: (url, option) =>
    request({
      url,
      init: {
        method: 'GET',
      },
      option,
    }),
  post: (url, option) =>
    request({
      url,
      init: {
        method: 'POST',
      },
      option,
    }),
  put: (url, option) =>
    request({
      url,
      init: {
        method: 'PUT',
      },
      option,
    }),
};

export default Api;
