import axios, { AxiosError, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { AppError } from "../helper/appError";

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

export const mesadinhaApi = axios.create({
  baseURL,
});

mesadinhaApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message ?? "Falha na requisição";

    return Promise.reject(new AppError(message));
  },
);
