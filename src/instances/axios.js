import axios from "axios";

const MainAxiosRequestConfig = {
  baseURL: "riviu-server-production.up.railway.app/api/v1",
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
};

const api = axios.create(MainAxiosRequestConfig);

export default api;
