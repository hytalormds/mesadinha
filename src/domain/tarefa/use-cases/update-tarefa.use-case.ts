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
      throw new NotFoundError("Tarefa nao encontrada");
    }

    if (params.familiaId && tarefa.fkFamiliaId !== params.familiaId) {
      throw new NotFoundError("Tarefa nao encontrada para a familia");
    }

    if (params.papel === "crianca") {
      const atualizacaoSomenteStatus =
        params.fkStatusTarefa !== undefined &&
        params.titulo === undefined &&
        params.descricao === undefined &&
        params.valorRecompensa === undefined &&
        params.dataLimite === undefined &&
        params.fkUsuarioCrianca === undefined;

      if (!atualizacaoSomenteStatus || tarefa.fkUsuarioCrianca !== params.userId) {
        throw new NotFoundError("Tarefa nao encontrada para o usuario");
      }

      await this.tarefaRepository.updateTarefa({
        idTarefa: params.idTarefa,
        userId: params.userId,
        familiaId: params.familiaId,
        fkStatusTarefa: params.fkStatusTarefa,
      });

      return;
    }

    if (tarefa.fkUsuarioResponsavel !== params.userId) {
      throw new NotFoundError("Tarefa nao encontrada para o usuario");
    }

    await this.tarefaRepository.updateTarefa(params);
  }
}
