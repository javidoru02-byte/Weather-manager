import axios from "axios";
import { JSON_URL, WEATHER_API_URL, API_KEY } from "../constants/constants";

export const jsonApi = axios.create({
  baseURL: JSON_URL,
  headers: { "Content-Type": "application/json" },
});

export const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
  headers: { "Content-Type": "application/json" },
  params: {
    appid: API_KEY,
  },
});
