export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  idTipo: 1 | 2;
  papel?: "responsavel" | "crianca";
  familiaId?: number;
}

export interface IAuthenticateResponse {
  token: string;
  user: IUserResponse;
}
