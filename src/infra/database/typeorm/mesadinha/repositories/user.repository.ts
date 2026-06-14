import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Carteira } from "../entities/Carteira";
import { DtMoneyDataSource } from "../data-source";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import {
  CreateUserParams,
  UserRepositoryInterface,
} from "../../../../../domain/user/repositoryInterface/user-repository.interface";

export class UserTypeormRepository implements UserRepositoryInterface {
  private userRepository: Repository<User>;
  private carteiraRepository: Repository<Carteira>;

  constructor() {
    this.userRepository = DtMoneyDataSource.getRepository(User);
    this.carteiraRepository = DtMoneyDataSource.getRepository(Carteira);
  }

  async createUser(user: CreateUserParams): Promise<User> {
    try {
      const userCreated = await this.userRepository.save({
        name: user.name,
        email: user.email,
        password: user.password,
        idTipo: user.idTipo ?? 1,
      });

      await this.carteiraRepository.save({
        saldo: 0,
        fkUsuarioId: userCreated.id,
      });

      return userCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar o usuario!", error);
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuario!", error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuario!", error);
    }
  }

  async updateUser(
    id: number,
    user: Partial<Pick<CreateUserParams, "name" | "email" | "password">>,
  ): Promise<User> {
    try {
      await this.userRepository.update(id, user);

      const userUpdated = await this.findById(id);

      if (!userUpdated) {
        throw new Error("Usuario nao encontrado apos atualizacao");
      }

      return userUpdated;
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar usuario!", error);
    }
  }
}
