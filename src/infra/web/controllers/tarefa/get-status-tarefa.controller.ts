import { FastifyReply, FastifyRequest } from "fastify";
import { GetStatusTarefaUseCase } from "../../../../domain/tarefa/use-cases/get-status-tarefa.use-case";

export class GetStatusTarefaController {
  private useCase: GetStatusTarefaUseCase;

  constructor() {
    this.useCase = new GetStatusTarefaUseCase();
  }

  execute = async (_req: FastifyRequest, reply: FastifyReply) => {
    const data = await this.useCase.execute();
    return reply.send(data);
  };
}
