import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;