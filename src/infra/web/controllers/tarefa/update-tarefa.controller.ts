import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateTarefaParams } from "../../../../domain/tarefa/repositoryInterface/tarefa-repository.interface";
import { UpdateTarefaUseCase } from "../../../../domain/tarefa/use-cases/update-tarefa.use-case";

export class UpdateTarefaController {
  private updateTarefaUseCase: UpdateTarefaUseCase;

  constructor() {
    this.updateTarefaUseCase = new UpdateTarefaUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: Omit<UpdateTarefaParams, "userId"> }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = request.user.id;

    await this.updateTarefaUseCase.execute({
      ...body,
      userId,
    });

    reply.status(204).send();
  };
}
