import { Tarefa } from "../../../infra/database/typeorm/dt-money/entities/Tarefa";
import { TarefaRepository } from "../../../infra/database/typeorm/dt-money/repositories/tarefa.repository";
import {
  CreateTarefaParams,
  TarefaRepositoryInterface,
} from "../repositoryInterface/tarefa-repository.interface";

export class CreateTarefaUseCase {
  private tarefaRepository: TarefaRepositoryInterface;

  constructor() {
    this.tarefaRepository = new TarefaRepository();
  }

  async execute(params: CreateTarefaParams): Promise<Tarefa> {
    return this.tarefaRepository.createTarefa(params);
  }
}
