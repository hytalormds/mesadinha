import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helper/appError";

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

export const mesadinhaApi = axios.create({
  baseURL,
});

mesadinhaApiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(new AppError("Falha na requisição"));
  },
);
