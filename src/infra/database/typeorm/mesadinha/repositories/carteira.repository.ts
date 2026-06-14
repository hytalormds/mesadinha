import { In, Repository } from "typeorm";
import { Carteira } from "../entities/Carteira";
import { Movimentacao } from "../entities/Movimentacao";
import { UsuarioFamilia } from "../entities/UsuarioFamilia";
import { DtMoneyDataSource } from "../data-source";
import {
  CarteiraRepositoryInterface,
  CreateMovimentacaoParams,
} from "../../../../../domain/carteira/repositoryInterface/carteira-repository.interface";
import { DatabaseError } from "../../../../../shared/errors/database.error";

export class CarteiraRepository implements CarteiraRepositoryInterface {
  private carteiraRepository: Repository<Carteira>;
  private movimentacaoRepository: Repository<Movimentacao>;
  private usuarioFamiliaRepository: Repository<UsuarioFamilia>;

  constructor() {
    this.carteiraRepository = DtMoneyDataSource.getRepository(Carteira);
    this.movimentacaoRepository = DtMoneyDataSource.getRepository(Movimentacao);
    this.usuarioFamiliaRepository =
      DtMoneyDataSource.getRepository(UsuarioFamilia);
  }

  async findById(idCarteira: number): Promise<Carteira | null> {
    try {
      return await this.carteiraRepository.findOne({
        where: { idCarteira },
        relations: { usuario: true },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar carteira", error);
    }
  }

  async findByUsuarioId(userId: number): Promise<Carteira | null> {
    try {
      return await this.carteiraRepository.findOne({
        where: { fkUsuarioId: userId },
        relations: { usuario: true },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar carteira do usuario", error);
    }
  }

  async findByFamiliaId(familiaId: number): Promise<Carteira[]> {
    try {
      const memberships = await this.usuarioFamiliaRepository.find({
        where: { fkFamiliaId: familiaId },
      });

      const userIds = memberships.map((membership) => membership.fkUsuarioId);

      if (userIds.length === 0) {
        return [];
      }

      return await this.carteiraRepository.find({
        where: { fkUsuarioId: In(userIds) },
        relations: { usuario: true },
        order: { fkUsuarioId: "ASC" },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar carteiras da familia", error);
    }
  }

  async updateSaldo(idCarteira: number, saldo: number): Promise<void> {
    try {
      await this.carteiraRepository.update(idCarteira, { saldo });
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar saldo da carteira", error);
    }
  }

  async createMovimentacao(
    params: CreateMovimentacaoParams,
  ): Promise<Movimentacao> {
    try {
      return await this.movimentacaoRepository.save({
        ...params,
        data: new Date(),
      });
    } catch (error) {
      throw new DatabaseError("Falha ao criar movimentacao", error);
    }
  }

  async findMovimentacoesByCarteiraIds(
    carteiraIds: number[],
  ): Promise<Movimentacao[]> {
    try {
      if (carteiraIds.length === 0) {
        return [];
      }

      return await this.movimentacaoRepository.find({
        where: { fkCarteiraId: In(carteiraIds) },
        relations: { tarefa: true, carteira: { usuario: true } },
        order: { data: "DESC" },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar movimentacoes", error);
    }
  }
}
