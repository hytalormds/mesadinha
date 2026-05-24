import { Repository } from "typeorm";
import { DtMoneyDataSource } from "../../../infra/database/typeorm/dt-money/data-source";
import { StatusTarefa } from "../../../infra/database/typeorm/dt-money/entities/StatusTarefa";
import { DatabaseError } from "../../../shared/errors/database.error";

export class GetStatusTarefaUseCase {
  private statusRepository: Repository<StatusTarefa>;

  constructor() {
    this.statusRepository = DtMoneyDataSource.getRepository(StatusTarefa);
  }

  async execute(): Promise<StatusTarefa[]> {
    try {
      return await this.statusRepository.find({
        select: ["idStatus", "descricao"],
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar status das tarefas", error);
    }
  }
}
