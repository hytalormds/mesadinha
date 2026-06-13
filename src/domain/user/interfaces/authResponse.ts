import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";

export interface AuthReponse {
  user: User;
  token: string;
}
