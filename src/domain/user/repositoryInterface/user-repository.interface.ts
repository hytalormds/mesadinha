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
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(
    id: number,
    user: Partial<Pick<CreateUserParams, "name" | "email" | "password">>,
  ): Promise<User>;
}
