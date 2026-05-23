import { FormLoginParams } from "@/screens/Login/LoginForm";
import { dtMoneyApi } from "@/shared/api/dtmoney";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response";
import { FormRegisterParams } from "@/screens/Register/RegisterForm/FormRegisterParams";

export const authenticate = async (
  userData: FormLoginParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData,
  );

  return data;
};

export const registerUser = async (
  userData: FormRegisterParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData,
  );

  return data;
};
