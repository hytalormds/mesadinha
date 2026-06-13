import { TarefaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/tarefa.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import {
  TarefaRepositoryInterface,
  UpdateTarefaParams,
} from "../repositoryInterface/tarefa-repository.interface";

export class UpdateTarefaUseCase {
  private tarefaRepository: TarefaRepositoryInterface;

  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  async execute(params: UpdateTarefaParams): Promise<void> {
    const tarefa = await this.tarefaRepository.findById(params.idTarefa);

    if (!tarefa) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    if (
      tarefa.fkUsuarioResponsavel !== params.userId ||
      (params.familiaId && tarefa.fkFamiliaId !== params.familiaId)
    ) {
      throw new NotFoundError("Tarefa não encontrada para o usuário");
    }

    await this.tarefaRepository.updateTarefa(params);
  }
}
