import axios from "axios";

const MainAxiosRequestConfig = {
  baseURL: "http://localhost:3000/api/v1",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
};

const api = axios.create(MainAxiosRequestConfig);

export default api;
