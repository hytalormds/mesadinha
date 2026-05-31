import { User } from "../entities/User";
import { Carteira } from "../entities/Carteira";
import {
  UserRepositoryInterface,
  CreateUserParams,
} from "../../../../../domain/user/repositoryInterface/user-repository.interface";
import { Repository } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { DatabaseError } from "../../../../../shared/errors/database.error";

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
      throw new DatabaseError("Falha ao criar o usuário!", error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar isiário!", error);
    }
  }
}
