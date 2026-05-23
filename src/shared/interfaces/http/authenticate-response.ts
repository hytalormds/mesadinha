export interface IUserResponse {
  id: number;
  name: string;
  email: string;
}

export interface IAuthenticateResponse {
  token: string;
  user: IUserResponse;
}
