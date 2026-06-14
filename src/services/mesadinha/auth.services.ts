import { mesadinhaApi } from "@/shared/api/mesadinha";
import { AuthLoginRequest } from "@/shared/interfaces/http/auth-login-request";
import { AuthRegisterRequest } from "@/shared/interfaces/http/auth-register-request";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response";
import type { Usuario } from "@/types/navigation";
import { ApiUser, mapUser } from "./mappers";
import { setSession } from "./session.service";

export const authenticate = async (
  userData: AuthLoginRequest,
): Promise<IAuthenticateResponse> => {
  const { data } = await mesadinhaApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData,
  );

  setSession(data.token, mapUser(data.user));

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

export const registerChild = async (
  userData: AuthRegisterRequest,
): Promise<Usuario> => {
  const { data } = await mesadinhaApi.post<{ user: ApiUser }>(
    "/auth/children",
    userData,
  );

  return mapUser(data.user);
};

export const listChildren = async (): Promise<Usuario[]> => {
  const { data } = await mesadinhaApi.get<{ data: ApiUser[] }>(
    "/auth/children",
  );

  return data.data.map(mapUser);
};
