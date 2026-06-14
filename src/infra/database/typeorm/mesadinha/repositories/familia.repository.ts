import { Repository } from "typeorm";
import { Familia } from "../entities/Familia";
import { UsuarioFamilia } from "../entities/UsuarioFamilia";
import { User } from "../entities/User";
import { DtMoneyDataSource } from "../data-source";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import {
  AddUsuarioFamiliaParams,
  CreateFamiliaParams,
  FamiliaRepositoryInterface,
} from "../../../../../domain/familia/repositoryInterface/familia-repository.interface";

export class FamiliaRepository implements FamiliaRepositoryInterface {
  private familiaRepository: Repository<Familia>;
  private usuarioFamiliaRepository: Repository<UsuarioFamilia>;

  constructor() {
    this.familiaRepository = DtMoneyDataSource.getRepository(Familia);
    this.usuarioFamiliaRepository =
      DtMoneyDataSource.getRepository(UsuarioFamilia);
  }

  async createFamilia(params: CreateFamiliaParams): Promise<Familia> {
    try {
      return await this.familiaRepository.save(params);
    } catch (error) {
      throw new DatabaseError("Falha ao criar familia", error);
    }
  }

  async addUsuarioFamilia(
    params: AddUsuarioFamiliaParams,
  ): Promise<UsuarioFamilia> {
    try {
      return await this.usuarioFamiliaRepository.save(params);
    } catch (error) {
      throw new DatabaseError("Falha ao vincular usuario a familia", error);
    }
  }

  async findMembershipByUserId(userId: number): Promise<UsuarioFamilia | null> {
    try {
      return await this.usuarioFamiliaRepository.findOne({
        where: { fkUsuarioId: userId },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar vinculo familiar", error);
    }
  }

  async findChildrenByFamiliaId(familiaId: number): Promise<User[]> {
    try {
      const memberships = await this.usuarioFamiliaRepository.find({
        where: {
          fkFamiliaId: familiaId,
          papel: "crianca",
        },
        relations: {
          usuario: true,
        },
      });

      return memberships.map((membership) => membership.usuario);
    } catch (error) {
      throw new DatabaseError("Falha ao buscar filhos da familia", error);
    }
  }
}
