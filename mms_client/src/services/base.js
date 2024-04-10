import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER,
});

baseAPI.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    if (token) request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (requestError) => {
    // TODO: add error handling for when network disappears
    return requestError;
  }
);

baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (responseError) => {
    if (
      responseError?.response?.status === 401 &&
      window.location.pathname !== "/"
    ) {
      window.location = "/";
    } else if (responseError?.response?.status === 403) {
      window.location = "/";
    }
    return Promise.reject(responseError);
  }
);

export default baseAPI;
