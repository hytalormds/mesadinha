import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";
import { Familia } from "../../../infra/database/typeorm/mesadinha/entities/Familia";

export interface AuthReponse {
  user: User;
  token: string;
  familia?: Familia;
}
