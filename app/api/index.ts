import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
export const baseUrl = "http://193.36.85.71:8080/FROST-Server/v1.0";
export const Api = axios.create({
  baseURL: baseUrl,
});
