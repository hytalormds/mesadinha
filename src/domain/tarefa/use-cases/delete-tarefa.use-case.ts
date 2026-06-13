import { TarefaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/tarefa.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { TarefaRepositoryInterface } from "../repositoryInterface/tarefa-repository.interface";

export class DeleteTarefaUseCase {
  private tarefaRepository: TarefaRepositoryInterface;

  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  async execute({
    idTarefa,
    userId,
    familiaId,
  }: {
    idTarefa: number;
    userId: number;
    familiaId?: number;
  }) {
    const tarefa = await this.tarefaRepository.findById(idTarefa);

    if (!tarefa) {
      throw new NotFoundError(`Tarefa com ID ${idTarefa} não encontrada!`);
    }

    if (
      tarefa.fkUsuarioResponsavel !== userId ||
      (familiaId && tarefa.fkFamiliaId !== familiaId)
    ) {
      throw new UnauthenticatedError(
        "Sem autorização para excluir esta tarefa!",
      );
    }

    await this.tarefaRepository.deleteTarefa(idTarefa);
  }
}
