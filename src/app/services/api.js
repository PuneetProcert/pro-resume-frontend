import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem("authToken") || "";
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken") || "";
};

const updateAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

//axios client
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//request middleware
client.interceptors.request.use(
  (config) => {
    config.headers["authorization-token"] = getAuthToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function refresh_token() {
  return authService.refreshToken({ refreshToken: getRefreshToken() });
}

let refreshing_token = null;

//response middleware
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    if (error.response && error.response.status === 401 && !config._retry) {
      try {
        refreshing_token = refreshing_token
          ? refreshing_token
          : refresh_token();
        let res = await refreshing_token();
        refreshing_token = null;
        if (res.data.authorizationToken) {
          updateAuthToken(res.data.authorizationToken);
        }
        return client(config);
      } catch (err) {
        //redirectin to login screen
        localStorage.clear();
        window.location.href = "/login";
      }
    } else if (
      error.response &&
      error.response.status === 403 &&
      error.response?.data?.message
        ?.toLowerCase()
        .includes("unauthorized access")
    ) {
      //redirectin to access denied page
      window.location.href = "/access-denied";
    }
    return Promise.reject(error);
  }
);

const request = {
  get: (url, params, config) =>
    client
      .get(url, { params: params, ...config })
      .then((res) => res.data)
      .catch((err) => {
        if (config?.responseType === "blob") {
          return Promise.reject(err);
        }
        return Promise.reject(err.response.data);
      }),
  post: (url, data, config) =>
    client
      .post(url, data, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response.data)),
  put: (url, data) =>
    client
      .put(url, data)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response.data)),
  patch: (url, data) =>
    client
      .patch(url, data)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response.data)),
  delete: (url, data) =>
    client
      .delete(url, { data: data })
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response.data)),
};

const authService = {
  refreshToken: (data) =>
    request.post(`/token/generateRefreshAuthorizationToken`, data),
  securityToken: (data) => request.post(`/token/generate-securitytoken`, data),
};

//**Api Admins */
const dashboardAdministration = {
  getDashboardDetails: () => request.get("/"),
};

const resumeAiAdministration = {
  enhanceFieldWithAi: (data) => request.post("enhancePrompt", data),
};

export const api = {
  authService,
  dashboardAdministration,
  resumeAiAdministration,
};
