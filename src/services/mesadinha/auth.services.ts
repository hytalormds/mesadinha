import { mesadinhaApi } from "@/shared/api/mesadinha";
import { AuthLoginRequest } from "@/shared/interfaces/http/auth-login-request";
import { AuthRegisterRequest } from "@/shared/interfaces/http/auth-register-request";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response";

export const authenticate = async (
  userData: AuthLoginRequest,
): Promise<IAuthenticateResponse> => {
  const { data } = await mesadinhaApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData,
  );

  return data;
};

export const registerUser = async (
  userData: AuthRegisterRequest,
): Promise<IAuthenticateResponse> => {
  const { data } = await mesadinhaApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData,
  );

  return data;
};
