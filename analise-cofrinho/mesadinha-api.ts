import axios, { AxiosError, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { AppError } from "../helper/appError";

const defaultBaseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
  default: "http://localhost:3001",
});

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? defaultBaseURL;

export const mesadinhaApi = axios.create({
  baseURL,
  timeout: 6000,
});

mesadinhaApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    let message = error.response?.data?.message;

    if (!message && error.code === "ECONNABORTED") {
      message =
        "A API demorou para responder. Verifique se o back-end esta rodando.";
    }

    if (!message && !error.response) {
      message = `Nao foi possivel conectar a API em ${baseURL}. Verifique se o back-end esta rodando.`;
    }

    message ??= "Falha na requisicao";

    return Promise.reject(new AppError(message));
  },
);
