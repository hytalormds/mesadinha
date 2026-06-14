import { FastifyReply, FastifyRequest } from "fastify";
import { CreditarTarefaUseCase } from "../../../../domain/carteira/use-cases/creditar-tarefa";

export class CreditarTarefaController {
  private creditarTarefaUseCase: CreditarTarefaUseCase;

  constructor() {
    this.creditarTarefaUseCase = new CreditarTarefaUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: { idTarefa: number } }>,
    reply: FastifyReply,
  ) => {
    const result = await this.creditarTarefaUseCase.execute({
      idTarefa: request.body.idTarefa,
      userId: request.user.id,
      familiaId: request.user.familiaId,
    });

    reply.send(result);
  };
}
