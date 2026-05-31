import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteTarefaUseCase } from "../../../../domain/tarefa/use-cases/delete-tarefa.use-case";

export class DeleteTarefaController {
  private deleteTarefaUseCase: DeleteTarefaUseCase;

  constructor() {
    this.deleteTarefaUseCase = new DeleteTarefaUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) => {
    const userId = request.user.id;
    const idTarefa = Number(request.params.id);

    await this.deleteTarefaUseCase.execute({
      idTarefa,
      userId,
      familiaId: request.user.familiaId,
    });

    reply.status(204).send();
  };
}
