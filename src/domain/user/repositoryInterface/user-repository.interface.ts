import { User } from "../../../infra/database/typeorm/dt-money/entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  idTipo?: number;
}

export interface UserRepositoryInterface {
  createUser(user: CreateUserParams): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
