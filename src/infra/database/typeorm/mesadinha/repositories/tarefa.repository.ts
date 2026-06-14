import { Brackets, Repository } from "typeorm";
import { Tarefa } from "../entities/Tarefa";
import { DtMoneyDataSource } from "../data-source";
import {
  CreateTarefaParams,
  GetTarefasParams,
  TarefaRepositoryInterface,
  TarefaResumoResponse,
  UpdateTarefaParams,
} from "../../../../../domain/tarefa/repositoryInterface/tarefa-repository.interface";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { Paginated } from "../../../../../interfaces/paginated";

export class TarefaRepository implements TarefaRepositoryInterface {
  private tarefaRepository: Repository<Tarefa>;

  constructor() {
    this.tarefaRepository = DtMoneyDataSource.getRepository(Tarefa);
  }

  async createTarefa(params: CreateTarefaParams): Promise<Tarefa> {
    try {
      const tarefa = await this.tarefaRepository.save({
        titulo: params.titulo,
        descricao: params.descricao,
        valorRecompensa: params.valorRecompensa,
        dataLimite: params.dataLimite,
        fkStatusTarefa: params.fkStatusTarefa,
        fkUsuarioResponsavel: params.userId,
        fkUsuarioCrianca: params.fkUsuarioCrianca,
        fkFamiliaId: params.familiaId,
      });

      return tarefa;
    } catch (error) {
      throw new DatabaseError("Falha ao criar tarefa", error);
    }
  }

  async deleteTarefa(idTarefa: number): Promise<void> {
    try {
      await this.tarefaRepository.delete(idTarefa);
    } catch (error) {
      throw new DatabaseError("Falha ao excluir a tarefa", error);
    }
  }

  async findById(idTarefa: number): Promise<Tarefa | null> {
    try {
      return await this.tarefaRepository.findOne({
        where: { idTarefa },
        relations: {
          usuarioResponsavel: true,
          usuarioCrianca: true,
          status: true,
        },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar tarefa por ID", error);
    }
  }

  async updateTarefa(params: UpdateTarefaParams): Promise<void> {
    try {
      const updateData: Partial<Tarefa> = {};

      if (params.fkUsuarioCrianca !== undefined) {
        updateData.fkUsuarioCrianca = params.fkUsuarioCrianca;
      }

      if (params.familiaId !== undefined) {
        updateData.fkFamiliaId = params.familiaId;
      }

      if (params.fkStatusTarefa !== undefined) {
        updateData.fkStatusTarefa = params.fkStatusTarefa;
      }

      if (params.titulo !== undefined) {
        updateData.titulo = params.titulo;
      }

      if (params.descricao !== undefined) {
        updateData.descricao = params.descricao;
      }

      if (params.valorRecompensa !== undefined) {
        updateData.valorRecompensa = params.valorRecompensa;
      }

      if (params.dataLimite !== undefined) {
        updateData.dataLimite = params.dataLimite;
      }

      await this.tarefaRepository.update(params.idTarefa, updateData);
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar a tarefa", error);
    }
  }

  async getTarefaResumo({
    userId,
    familiaId,
    papel,
    filters,
    searchText,
  }: GetTarefasParams): Promise<TarefaResumoResponse> {
    try {
      const query = this.tarefaRepository
        .createQueryBuilder("tarefa")
        .leftJoinAndSelect("tarefa.status", "status")
        .select([
          "COUNT(tarefa.idTarefa) AS totalTarefas",
          "COALESCE(SUM(tarefa.valorRecompensa), 0) AS totalRecompensas",
        ])
        .where("tarefa.fkFamiliaId = :familiaId", { familiaId });

      if (papel === "crianca") {
        query.andWhere("tarefa.fkUsuarioCrianca = :userId", { userId });
      }

      if (filters?.from) {
        query.andWhere("tarefa.dataLimite >= :from", { from: filters.from });
      }

      if (filters?.to) {
        query.andWhere("tarefa.dataLimite <= :to", { to: filters.to });
      }

      if (filters?.statusIds?.length) {
        query.andWhere("status.idStatus IN (:...statusIds)", {
          statusIds: filters.statusIds,
        });
      }

      if (searchText) {
        query.andWhere(
          new Brackets((qb) => {
            qb.orWhere("tarefa.titulo LIKE :searchText", {
              searchText: `%${searchText}%`,
            })
              .orWhere("tarefa.descricao LIKE :searchText", {
                searchText: `%${searchText}%`,
              })
              .orWhere("status.descricao LIKE :searchText", {
                searchText: `%${searchText}%`,
              });
          }),
        );
      }

      const result = await query.getRawOne();

      return {
        totalTarefas: Number(result.totalTarefas),
        totalRecompensas: Number(result.totalRecompensas),
      };
    } catch (error) {
      throw new DatabaseError("Falha ao calcular resumo das tarefas", error);
    }
  }

  async getTarefas({
    userId,
    familiaId,
    papel,
    pagination,
    filters,
    searchText,
    sort,
  }: GetTarefasParams): Promise<Paginated<Tarefa>> {
    try {
      let totalRows = 0;
      let totalPages = 0;
      let page = 0;
      let perPage = 0;
      let tarefas: Tarefa[] = [];

      const query = this.tarefaRepository
        .createQueryBuilder("tarefa")
        .leftJoinAndSelect("tarefa.status", "status")
        .leftJoinAndSelect("tarefa.usuarioResponsavel", "usuarioResponsavel")
        .leftJoinAndSelect("tarefa.usuarioCrianca", "usuarioCrianca")
        .where("tarefa.fkFamiliaId = :familiaId", { familiaId });

      if (papel === "crianca") {
        query.andWhere("tarefa.fkUsuarioCrianca = :userId", { userId });
      }

      if (sort?.id) {
        query.addOrderBy(
          "tarefa.idTarefa",
          sort.id.toUpperCase() as "ASC" | "DESC",
        );
      } else {
        query.addOrderBy("tarefa.idTarefa", "DESC");
      }

      if (searchText) {
        query.andWhere(
          new Brackets((qb) => {
            qb.orWhere("tarefa.titulo LIKE :searchText", {
              searchText: `%${searchText}%`,
            })
              .orWhere("tarefa.descricao LIKE :searchText", {
                searchText: `%${searchText}%`,
              })
              .orWhere("status.descricao LIKE :searchText", {
                searchText: `%${searchText}%`,
              });
          }),
        );
      }

      if (filters?.from) {
        query.andWhere("tarefa.dataLimite >= :from", { from: filters.from });
      }

      if (filters?.to) {
        query.andWhere("tarefa.dataLimite <= :to", { to: filters.to });
      }

      if (filters?.statusIds?.length) {
        query.andWhere("status.idStatus IN (:...statusIds)", {
          statusIds: filters.statusIds,
        });
      }

      if (pagination) {
        const skip = (pagination.page - 1) * pagination.perPage;
        const take = pagination.perPage;

        query.skip(skip).take(take);

        const result = await query.getManyAndCount();

        tarefas = result[0];
        totalRows = result[1];
        totalPages = Math.ceil(totalRows / pagination.perPage);
        page = pagination.page;
        perPage = pagination.perPage;
      } else {
        tarefas = await query.getMany();
      }

      return {
        data: tarefas,
        totalRows,
        totalPages,
        page,
        perPage,
      };
    } catch (error) {
      throw new DatabaseError("Falha ao buscar tarefas", error);
    }
  }
}
