import { TarefaRepository } from "../../../infra/database/typeorm/dt-money/repositories/tarefa.repository";
import {
  GetTarefasParams,
  TarefaRepositoryInterface,
} from "../repositoryInterface/tarefa-repository.interface";

export class GetTarefaUseCase {
  private tarefaRepository: TarefaRepositoryInterface;

  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  async execute(params: GetTarefasParams) {
    const [tarefas, resumo] = await Promise.all([
      this.tarefaRepository.getTarefas(params),
      this.tarefaRepository.getTarefaResumo(params),
    ]);

    return { ...tarefas, resumo };
  }
}
