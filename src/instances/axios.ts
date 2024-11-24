import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const MainAxiosRequestConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:3000/api/v1",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
};

const api: AxiosInstance = axios.create(MainAxiosRequestConfig);

export default api;
