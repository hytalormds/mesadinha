import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  idTipo?: number;
  nomeFamilia?: string;
}

export interface UserRepositoryInterface {
  createUser(user: CreateUserParams): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
